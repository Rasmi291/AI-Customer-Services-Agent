from fastapi import FastAPI
from app.schemas import AskRequest
from app.knowledge_loader import load_all_pdfs
from app.rag import build_vector_store, search_knowledge_base
from app.llm import generate_customer_response
from app.language_utils import detect_language
from app.intent_router import detect_intent
from app.context_builder import build_context
from app.retrievers.hybrid import hybrid_search
from app.response_planner import build_response_plan
from app.pricing.pricing_engine import calculate_pricing
from app.schemas import AskRequest, PricingRequest, CurrencyRequest, QuotationRequest, InvoiceRequest
from app.pricing.currency import convert_currency
from app.schemas import QuotationRequest
from app.pricing.quotation import generate_quotation
from app.pricing.invoice import generate_invoice
from fastapi.middleware.cors import CORSMiddleware
from app.pricing.pricing_rules import PRICING_RULES

app = FastAPI(title="AI Customer Service Agent")
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://localhost:5174",
        "http://127.0.0.1:5173",
        "http://127.0.0.1:5174",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def root():
    return {
        "message": "AI Customer Service Agent Running"
    }

@app.post("/ask")
def ask_question(data: AskRequest):
    try:
        selected_language = data.language

        if data.language.lower() == "auto":
            selected_language = detect_language(data.question)
        intent = detect_intent(data.question)
        response_plan = build_response_plan(intent)
        results = search_knowledge_base(data.question, k=5, intent=intent)

        context = build_context(results, intent=intent)
        context = context + "\n\nRESPONSE PLAN:\n" + response_plan

        answer = generate_customer_response(
            question=data.question,
            context=context,
            language=selected_language
        )

        return {
            "question": data.question,
            "language": selected_language,
            "intent": intent,
            "answer": answer,
            "sources": [
                {
                    "source": doc.metadata.get("source", "unknown"),
                    "page": doc.metadata.get("page", "unknown")
                }
                for doc in results
            ]
        }

    except Exception as e:
          return {
            "question": data.question,
            "language": data.language,
            "answer": (
                "The AI model is temporarily unavailable.\n\n"
                "However, based on the available company knowledge, we provide AI solutions such as:\n"
                "- Custom AI agents\n"
                "- Chatbots\n"
                "- Workflow automation\n"
                "- Document intelligence\n"
                "- RAG systems\n"
                "- Voice AI\n"
                "- AI integrations\n"
                "- Enterprise automation\n\n"
                "For exact service scope, pricing, and implementation details, please contact the team."
            ),
            "fallback_used": True,
            "error": str(e)
        }
@app.post("/pricing/calculate")
def pricing_calculate(data: dict):
    items = data.get("items", [])
    result = calculate_pricing(items)
    return result

@app.post("/pricing/convert")
def convert_pricing_currency(request: CurrencyRequest):

    result = convert_currency(
        amount=request.amount,
        target_currency=request.currency
    )

    return {
        "original_amount_inr": request.amount,
        "conversion": result
    }

@app.post("/quotation/generate")
def quotation_generate(request: QuotationRequest):
    data = request.dict()
    return generate_quotation(data)

@app.post("/invoice/generate")
def invoice_generate(request: InvoiceRequest):
    data = request.dict()
    return generate_invoice(data)
    
@app.get("/test-loader")
def test_loader():
    documents = load_all_pdfs()

    return {
        "total_pages_loaded": len(documents),
        "first_page_preview": documents[0].page_content[:500] if documents else "No documents found"
    }

@app.get("/build-index")
def build_index():
    result = build_vector_store()
    return result
@app.get("/search")
def search(query: str):
    results = search_knowledge_base(query)

    return {
        "query": query,
        "results": [
            {
                "content": doc.page_content[:700],
                "source": doc.metadata.get("source", "unknown"),
                "page": doc.metadata.get("page", "unknown")
            }
            for doc in results
        ]
    }
@app.get("/services")
def get_services():

    services = []

    for service_name, rule in PRICING_RULES.items():

        services.append({
            "service_name": service_name,
            "category": rule.get("category", "General"),
            "base_price": rule.get("base_price", 0),
            "timeline_weeks": rule.get("timeline_weeks", 0)
        })

    return {
        "count": len(services),
        "services": services
    }