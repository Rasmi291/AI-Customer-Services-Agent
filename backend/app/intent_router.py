def detect_intent(question: str) -> str:
    q = question.lower()

    company_keywords = [
        "company", "about your company", "who are you",
        "why should i choose", "why choose", "different from others",
        "your strengths", "what makes you different"
    ]

    ai_keywords = [
        "ai service", "ai agent", "chatbot", "rag",
        "voice ai", "automation", "llm", "customer support agent"
    ]

    pricing_keywords = [
        "price", "pricing", "cost", "quotation", "quote",
        "package", "subscription", "charges", "fee"
    ]

    audit_keywords = [
        "audit", "business audit", "quarterly audit"
    ]

    policy_keywords = [
        "refund", "cancellation", "policy", "nda", "privacy",
        "terms", "condition"
    ]

    digital_marketing_keywords = [
        "seo", "google ads", "facebook ads", "social media",
        "digital marketing", "lead generation"
    ]

    cybersecurity_keywords = [
        "cyber", "security", "vulnerability", "threat",
        "data protection", "compliance"
    ]

    if any(word in q for word in company_keywords):
        return "company"

    if any(word in q for word in pricing_keywords):
        return "pricing"

    if any(word in q for word in audit_keywords):
        return "audit"

    if any(word in q for word in policy_keywords):
        return "policy"

    if any(word in q for word in digital_marketing_keywords):
        return "digital_marketing"

    if any(word in q for word in cybersecurity_keywords):
        return "cybersecurity"

    if any(word in q for word in ai_keywords):
        return "ai_services"

    return "general"