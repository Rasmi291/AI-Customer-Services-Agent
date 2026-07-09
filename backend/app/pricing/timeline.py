def calculate_timeline(base_timeline_weeks: int, item: dict, complexity: dict):
    timeline = base_timeline_weeks or 1
    reasons = []

    complexity_level = complexity.get("complexity_level", "Basic")
    integrations = item.get("integrations") or 0
    languages = item.get("languages") or 0
    deployment = (item.get("deployment") or "").lower()
    countries = item.get("countries") or 1
    timeline_preference = (item.get("timeline") or "").lower()

    if complexity_level == "Standard":
        timeline += 1
        reasons.append("Standard complexity added 1 week")

    elif complexity_level == "Professional":
        timeline += 2
        reasons.append("Professional complexity added 2 weeks")

    elif complexity_level == "Enterprise":
        timeline += 4
        reasons.append("Enterprise complexity added 4 weeks")

    if integrations > 2:
        timeline += 1
        reasons.append("Multiple integrations added 1 week")

    if integrations > 5:
        timeline += 2
        reasons.append("High integration complexity added 2 weeks")

    if languages > 3:
        timeline += 1
        reasons.append("Multilingual support added 1 week")

    if deployment in ["on-premise", "on premise", "self-hosted"]:
        timeline += 2
        reasons.append("On-premise deployment added 2 weeks")

    if countries > 1:
        timeline += min(countries, 4)
        reasons.append(f"Multi-country rollout added {min(countries, 4)} weeks")

    priority_delivery = False

    if timeline_preference in ["urgent", "fast", "priority"]:
        timeline = max(1, timeline - 1)
        priority_delivery = True
        reasons.append("Urgent delivery requested, timeline reduced by 1 week")

    return {
        "base_timeline_weeks": base_timeline_weeks,
        "estimated_timeline_weeks": timeline,
        "priority_delivery": priority_delivery,
        "timeline_reasons": reasons
    }