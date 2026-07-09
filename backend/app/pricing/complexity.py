def calculate_complexity(item: dict):
    score = 0
    reasons = []

    users = item.get("users") or 0
    integrations = item.get("integrations") or 0
    languages = item.get("languages") or 0

    deployment = (item.get("deployment") or "").lower()
    industry = (item.get("industry") or "").lower()
    security_level = (item.get("security_level") or "").lower()
    timeline = (item.get("timeline") or "").lower()

    custom_ai = item.get("custom_ai", False)
    data_migration = item.get("data_migration", False)
    training_required = item.get("training_required", False)

    support_months = item.get("support_months") or 0
    countries = item.get("countries") or 1

    if users > 100:
        score += 2
        reasons.append("More than 100 users")

    if users > 1000:
        score += 3
        reasons.append("Large user base")

    if integrations > 2:
        score += 2
        reasons.append("Multiple integrations required")

    if integrations > 5:
        score += 3
        reasons.append("High integration complexity")

    if languages > 3:
        score += 2
        reasons.append("Multilingual support required")

    if languages > 8:
        score += 3
        reasons.append("Large multilingual scope")

    if deployment in ["on-premise", "on premise", "self-hosted"]:
        score += 2
        reasons.append("On-premise or self-hosted deployment")

    if industry in ["healthcare", "banking", "finance", "government", "legal"]:
        score += 3
        reasons.append("Highly regulated industry")

    if security_level in ["high", "enterprise", "advanced"]:
        score += 3
        reasons.append("Advanced security requirement")

    if timeline in ["urgent", "fast", "priority"]:
        score += 2
        reasons.append("Urgent delivery requirement")

    if custom_ai:
        score += 3
        reasons.append("Custom AI model or custom logic required")

    if data_migration:
        score += 2
        reasons.append("Data migration required")

    if training_required:
        score += 1
        reasons.append("Training or onboarding required")

    if support_months >= 12:
        score += 2
        reasons.append("Extended support period")

    if countries > 1:
        score += min(countries, 5)
        reasons.append(f"Multi-country rollout across {countries} countries")

    if score <= 2:
        level = "Basic"
        charge = 0
    elif score <= 5:
        level = "Standard"
        charge = 10000
    elif score <= 9:
        level = "Professional"
        charge = 25000
    else:
        level = "Enterprise"
        charge = 50000

    return {
        "complexity_score": score,
        "complexity_level": level,
        "complexity_charge": charge,
        "complexity_reasons": reasons
    }