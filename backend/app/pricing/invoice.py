from datetime import datetime, timedelta
from app.pricing.quotation import generate_quotation


def generate_invoice(data: dict):
    quotation = generate_quotation(data)

    invoice_no = "INV-" + datetime.now().strftime("%Y%m%d%H%M%S")
    invoice_date = datetime.now().strftime("%Y-%m-%d")
    due_date = (datetime.now() + timedelta(days=7)).strftime("%Y-%m-%d")

    return {
        "invoice_no": invoice_no,
        "invoice_date": invoice_date,
        "due_date": due_date,
        "issued_by": "FingertipsTech and FingertipsStatutory",
        "prepared_by": "AI Pricing Decision Agent",
        "client": quotation["client"],
        "quotation_reference": quotation["quotation_no"],
        "pricing": quotation["pricing"],
        "currency_conversion": quotation["currency_conversion"],
        "payment_status": "Pending",
        "payment_terms": [
            "Invoice is payable within 7 days.",
            "Work will begin after confirmation and advance payment.",
            "Final delivery depends on confirmed project scope.",
            "Currency conversion is indicative and may vary on billing date."
        ],
        "bank_details": {
            "account_name": "FingertipsTech / FingertipsStatutory",
            "payment_mode": "Bank Transfer / UPI / Online Payment",
            "note": "Final bank details will be shared by the accounts team."
        },
        "status": (
            "Human review required before invoice"
            if quotation["pricing"]["escalation_required"]
            else "Follow-up information required before invoice"
            if quotation["pricing"]["follow_up_required"]
            else "Invoice generated"
        )
    }