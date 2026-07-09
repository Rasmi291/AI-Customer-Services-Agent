from app.company_memory import COMPANY_BRAND_SUMMARY, COMPANY_MEMORY


def score_document(doc, intent: str):
    score = 0
    source = doc.metadata.get("source", "").lower()

    intent_keywords = {
        "company": ["company", "overview", "faq", "foundation", "audit"],
        "ai_services": ["ai", "agent", "automation", "rag"],
        "digital_marketing": ["digital", "marketing", "seo", "social"],
        "audit": ["audit", "business_audit"],
        "pricing": ["pricing", "catalog", "package"],
        "policy": ["policy", "refund", "cancellation", "terms"],
    }

    keywords = intent_keywords.get(intent, [])

    for word in keywords:
        if word in source:
            score += 10

    score += len(doc.page_content) / 500

    return score


def build_context(docs, intent: str = "general") -> str:
    if not docs:
        return "No relevant company knowledge found."

    priority_sections = {
        "company": """
For company-related questions, prioritize:
1. First-of-its-kind 24x7 multi-vertical business model
2. 210+ micro-niche products and services
3. AI + Digital Marketing + Cybersecurity + Legal + Accounting + HR + Coaching + Business Consulting under one platform
4. Business Audit & Growth Enhancement Program
5. 24x7 AI-enabled support
6. International remote/hybrid delivery
7. One-stop solution and reduced vendor dependency
""",
        "ai_services": """
For AI service questions, prioritize AI agents, chatbots, workflow automation, RAG systems, voice AI, integrations, business benefits, deployment, and support.
""",
        "pricing": """
For pricing questions, provide exact pricing only if available. Otherwise say pricing depends on scope, integrations, deployment complexity, customization, and support needs.
""",
        "audit": """
For audit questions, explain what the audit is, why it is useful, process, deliverables, duration, and benefits.
""",
        "policy": """
For policy questions, answer only from retrieved policy knowledge and mention exact conditions if available.
""",
        "general": """
Answer only from available company knowledge. Use the most relevant facts and avoid unnecessary internal details.
"""
    }

    docs = sorted(
        docs,
        key=lambda d: score_document(d, intent),
        reverse=True
    )[:5]

    context_parts = []

    if intent == "company":
        context_parts.append("COMPANY BRAND SUMMARY:")
        context_parts.append(COMPANY_BRAND_SUMMARY)

        context_parts.append("\nVERIFIED COMPANY MEMORY:")
        context_parts.append(COMPANY_MEMORY)

    context_parts.append("INTENT-SPECIFIC PRIORITY INSTRUCTIONS:")
    context_parts.append(priority_sections.get(intent, priority_sections["general"]))

    context_parts.append("\nRETRIEVED COMPANY KNOWLEDGE:")

    for i, doc in enumerate(docs, start=1):
        source = doc.metadata.get("source", "unknown")
        page = doc.metadata.get("page", "unknown")
        content = doc.page_content.strip()

        context_parts.append(
            f"""
Source {i}:
Document: {source}
Page: {page}
Content:
{content}
"""
        )

    return "\n".join(context_parts)