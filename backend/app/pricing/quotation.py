from datetime import datetime
from app.pricing.pricing_engine import calculate_pricing
from app.pricing.currency import convert_currency


def generate_quotation(data: dict):
    client_name = data.get("client_name", "Client")
    client_email = data.get("client_email", "")
    client_country = data.get("client_country", "")
    currency = data.get("currency", "INR")
    items = data.get("items", [])

    pricing_result = calculate_pricing(items)

    converted_total = convert_currency(
        pricing_result["grand_total"],
        currency
    )

    quotation_no = "QT-" + datetime.now().strftime("%Y%m%d%H%M%S")

    return {
        "quotation_no": quotation_no,
        "quotation_date": datetime.now().strftime("%Y-%m-%d"),
        "validity": "30 Days",
        "issued_by": "FingertipsTech and FingertipsStatutory",
        "prepared_by": "AI Pricing Decision Agent",
        "client": {
            "name": client_name,
            "email": client_email,
            "country": client_country
        },
        "pricing": pricing_result,
        "currency_conversion": converted_total,
        "status": (
            "Human review required before final quotation"
            if pricing_result["escalation_required"]
            else "Follow-up information required before final quotation"
            if pricing_result["follow_up_required"]
            else "Quotation ready"
        ),
        "terms": [
            "This quotation is valid for 30 days.",
            "Final scope and delivery timeline may change after requirement review.",
            "Taxes are calculated as per applicable GST rules.",
            "Currency conversion is indicative and may vary on final billing date.",
            "Work will begin after confirmation and advance payment."
        ]
    }