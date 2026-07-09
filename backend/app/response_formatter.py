from app.formatters.company import company_formatter
from app.formatters.general import general_formatter


def get_response_format_instructions(intent: str) -> str:
    mapping = {
        "company": company_formatter,
    }

    formatter = mapping.get(intent, general_formatter)
    return formatter()