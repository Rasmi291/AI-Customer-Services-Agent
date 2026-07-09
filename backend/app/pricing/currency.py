# currency.py

CURRENCY_RATES = {
    "INR": 1.0,
    "USD": 0.012,
    "EUR": 0.011,
    "GBP": 0.0095,
    "AED": 0.044,
    "AUD": 0.018,
    "CAD": 0.016,
    "SGD": 0.016,
}


CURRENCY_SYMBOLS = {
    "INR": "₹",
    "USD": "$",
    "EUR": "€",
    "GBP": "£",
    "AED": "AED ",
    "AUD": "A$",
    "CAD": "C$",
    "SGD": "S$",
}


def convert_currency(amount, target_currency="INR"):
    """
    Convert INR amount to another currency.
    """

    target_currency = target_currency.upper()

    rate = CURRENCY_RATES.get(target_currency)

    if rate is None:
        return {
            "currency": "INR",
            "symbol": "₹",
            "amount": round(amount, 2),
            "exchange_rate": 1.0,
            "conversion_status": "Unsupported currency"
        }

    converted = amount * rate

    return {
        "currency": target_currency,
        "symbol": CURRENCY_SYMBOLS[target_currency],
        "amount": round(converted, 2),
        "exchange_rate": rate,
        "conversion_status": "Converted"
    }