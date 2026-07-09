def check_escalation(item: dict, complexity: dict | None = None):
    reasons = []

    service_name = (item.get("service_name") or "").lower()

    hard_escalation_keywords = [
        "sap",
        "oracle",
        "government",
        "defence",
        "military",
        "drone",
        "robot",
        "medical diagnosis",
        "banking core",
        "custom llm training",
        "fine tuning"
    ]

    for keyword in hard_escalation_keywords:
        if keyword in service_name:
            reasons.append(f"Specialized/custom solution detected: {keyword}")

    if item.get("requires_consultation", False):
        reasons.append("Manual consultation requested")

    if complexity:
        if complexity.get("complexity_score", 0) >= 15:
            reasons.append("Very high project complexity requires consultant review")

    return {
        "escalation_required": len(reasons) > 0,
        "reasons": reasons
    }