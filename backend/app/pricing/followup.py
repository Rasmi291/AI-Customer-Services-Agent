FOLLOWUP_RULES = {

    "AI Customer Support Agent": [
        "How many users will use the system?",
        "How many languages are required?",
        "Do you need WhatsApp integration?",
        "Do you need CRM integration?",
        "Do you require Voice AI?",
        "Cloud deployment or On-Premise?",
        "Do you require mobile app integration?"
    ],

    "AI Sales Agent": [
        "How many sales users?",
        "Do you require CRM integration?",
        "Do you require WhatsApp automation?",
        "Will outbound calling be required?",
        "How many leads are expected per month?"
    ],

    "Website Development": [
        "How many pages are required?",
        "Do you need an Admin Panel?",
        "Do you need a Payment Gateway?",
        "Will the website support multiple languages?",
        "Do you require a CMS?"
    ],

    "Digital Marketing": [
        "Which platforms do you want to target?",
        "Monthly marketing budget?",
        "How many campaigns are required?",
        "Do you require SEO services?",
        "Do you require social media management?"
    ]

}


def get_followup_questions(service_name: str):

    return FOLLOWUP_RULES.get(service_name, [])