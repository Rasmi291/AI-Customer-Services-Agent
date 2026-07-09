from pydantic import BaseModel
from typing import List, Optional


class AskRequest(BaseModel):
    question: str
    language: str = "English"


class PricingItem(BaseModel):
    service_name: str
    quantity: int = 1

    users: Optional[int] = None
    integrations: Optional[int] = None
    languages: Optional[int] = None

    cloud: Optional[bool] = None
    mobile_app: Optional[bool] = None
    voice_ai: Optional[bool] = None
    data_migration: Optional[bool] = None
    training_required: Optional[bool] = None
    support_months: Optional[int] = None
    countries: Optional[int] = None


class PricingRequest(BaseModel):
    items: List[PricingItem]


class CurrencyRequest(BaseModel):
    amount: float
    currency: str

class QuotationRequest(BaseModel):
    client_name: str
    client_email: str = ""
    client_country: str = ""
    currency: str = "INR"
    items: list

class InvoiceRequest(BaseModel):
    client_name: str
    client_email: str = ""
    client_country: str = ""
    currency: str = "INR"
    items: list