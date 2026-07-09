def build_response_plan(intent: str) -> str:

    plans = {

        "company": """
Response Structure

1. Short company introduction

2. What makes the company unique

3. Core services

4. Industries served

5. Business Audit Program

6. 24×7 AI-enabled support

7. International delivery model

8. Call to action
""",

        "ai_services": """
Response Structure

1. What the AI service is

2. Business problems it solves

3. Key features

4. Benefits

5. Industries

6. Deployment options

7. Call to action
""",

        "pricing": """
Response Structure

1. Pricing availability

2. Pricing factors

3. Custom quotation

4. Next steps
""",

        "audit": """
Response Structure

1. Audit overview

2. Why businesses need it

3. Process

4. Deliverables

5. Benefits

6. CTA
""",

        "general": """
Response Structure

1. Direct answer

2. Business relevance

3. Helpful recommendation

4. CTA
"""
    }

    return plans.get(intent, plans["general"])