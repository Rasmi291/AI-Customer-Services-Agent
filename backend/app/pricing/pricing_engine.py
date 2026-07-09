from app.pricing.pricing_rules import PRICING_RULES, GST_RATE
from app.pricing.followup import get_followup_questions
from app.pricing.complexity import calculate_complexity
from app.pricing.escalation import check_escalation
from app.pricing.timeline import calculate_timeline


def calculate_pricing(items: list):
    invoice_items = []
    subtotal = 0
    escalation_required = False
    follow_up_required = False
    escalation_reasons = []
    follow_up_questions = []

    for item in items:
        service_name = item.get("service_name")
        quantity = item.get("quantity", 1)

        if not service_name:
            escalation_required = True
            escalation_reasons.append("Service name is missing.")
            continue

        if service_name not in PRICING_RULES:
            escalation_required = True
            escalation_reasons.append(
                f"'{service_name}' is not available in the approved pricing catalog."
            )
            invoice_items.append({
                "service_name": service_name,
                "quantity": quantity,
                "pricing_status": "Human escalation required",
                "reason": "Service not found in approved pricing rules"
            })
            continue

        rule = PRICING_RULES[service_name]
        unit_price = rule.get("base_price")

        if unit_price is None:
            escalation_required = True
            escalation_reasons.append(f"Approved price is missing for '{service_name}'.")
            continue

        users = item.get("users")
        integrations = item.get("integrations")
        languages = item.get("languages")

        if users is None or integrations is None or languages is None:
            follow_up_required = True
            follow_up_questions.extend(get_followup_questions(service_name))
            invoice_items.append({
                "service_name": service_name,
                "quantity": quantity,
                "base_price": unit_price,
                "pricing_status": "Follow-up required before final quotation",
                "reason": "Important project details are missing"
            })
            continue

        complexity = calculate_complexity(item)
        timeline = calculate_timeline(
            base_timeline_weeks=rule.get("timeline_weeks", 1),
            item=item,
            complexity=complexity
        )

        escalation_check = check_escalation(item, complexity)

        if escalation_check["escalation_required"]:
            escalation_required = True
            escalation_reasons.extend(escalation_check["reasons"])
            invoice_items.append({
                "service_name": service_name,
                "quantity": quantity,
                "base_price": unit_price,
                "complexity_score": complexity["complexity_score"],
                "complexity_level": complexity["complexity_level"],
                "base_timeline_weeks": timeline["base_timeline_weeks"],
                "estimated_timeline_weeks": timeline["estimated_timeline_weeks"],
                "priority_delivery": timeline["priority_delivery"],
                "timeline_reasons": timeline["timeline_reasons"],
                "pricing_status": "Human escalation required",
                "reason": escalation_check["reasons"]
            })
            continue

        line_total = (unit_price + complexity["complexity_charge"]) * quantity
        subtotal += line_total

        invoice_items.append({
            "service_name": service_name,
            "category": rule.get("category", "General"),
            "quantity": quantity,
            "base_price": unit_price,
            "complexity_score": complexity["complexity_score"],
            "complexity_level": complexity["complexity_level"],
            "complexity_charge": complexity["complexity_charge"],
            "complexity_reasons": complexity["complexity_reasons"],
            "line_total": line_total,
            "base_timeline_weeks": timeline["base_timeline_weeks"],
            "estimated_timeline_weeks": timeline["estimated_timeline_weeks"],
            "priority_delivery": timeline["priority_delivery"],
            "timeline_reasons": timeline["timeline_reasons"],
            "pricing_status": "Calculated"
        })

    gst_amount = subtotal * GST_RATE / 100
    grand_total = subtotal + gst_amount

    if escalation_required:
        decision_status = "Human escalation required"
    elif follow_up_required:
        decision_status = "Follow-up required before final quotation"
    else:
        decision_status = "Pricing calculated successfully"

    return {
        "items": invoice_items,
        "subtotal": subtotal,
        "gst_rate": GST_RATE,
        "gst_amount": gst_amount,
        "grand_total": grand_total,
        "follow_up_required": follow_up_required,
        "follow_up_questions": list(set(follow_up_questions)),
        "escalation_required": escalation_required,
        "escalation_reasons": list(set(escalation_reasons)),
        "decision_status": decision_status,
        "message": (
            "A human consultant should review this request before final quotation."
            if escalation_required
            else "Some details are missing. Please collect follow-up information before final quotation."
            if follow_up_required
            else "Pricing calculated successfully and ready for quotation."
        )
    }