from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_huggingface import HuggingFaceEmbeddings
from langchain_community.vectorstores import Chroma

from app.knowledge_loader import load_all_pdfs

VECTOR_DB_PATH = "chroma_db"


def build_vector_store():
    documents = load_all_pdfs()

    splitter = RecursiveCharacterTextSplitter(
        chunk_size=800,
        chunk_overlap=150
    )

    chunks = splitter.split_documents(documents)

    embeddings = HuggingFaceEmbeddings(
        model_name="BAAI/bge-small-en-v1.5"
    )

    vector_store = Chroma.from_documents(
        documents=chunks,
        embedding=embeddings,
        persist_directory=VECTOR_DB_PATH
    )

    return {
        "total_documents": len(documents),
        "total_chunks": len(chunks),
        "message": "Vector database created successfully"
    }


def get_vector_store():
    embeddings = HuggingFaceEmbeddings(
        model_name="BAAI/bge-small-en-v1.5"
    )

    vector_store = Chroma(
        persist_directory=VECTOR_DB_PATH,
        embedding_function=embeddings
    )

    return vector_store
def search_knowledge_base(question: str, k: int = 5, intent: str = "general"):
    vector_store = get_vector_store()

    intent_filters = {
        "company": [
            "Company",
            "FAQ_Master",
            "Company_Overview",
            "Company Foundation",
            "Business_Audit",
            "Audit"
        ],
        "ai_services": [
            "AI",
            "AI_Solutions",
            "FAQ_Master",
            "Services"
        ],
        "pricing": [
            "pricing",
            "catalog",
            "Service_Catalog",
            "FAQ_Master"
        ],
        "audit": [
            "Audit",
            "Business_Audit",
            "Quarterly_Audit"
        ],
        "policy": [
            "policy",
            "Refund",
            "Cancellation",
            "Privacy",
            "Terms"
        ],
        "digital_marketing": [
            "Digital",
            "Marketing",
            "SEO",
            "Google_Ads"
        ],
        "cybersecurity": [
            "Cyber",
            "Security",
            "Compliance"
        ],
    }

    # First get more results than needed
    raw_results = vector_store.similarity_search(
        question,
        k=20
    )

    allowed_keywords = intent_filters.get(intent, [])

    if not allowed_keywords:
        return raw_results[:k]

    filtered_results = []

    for doc in raw_results:
        source = doc.metadata.get("source", "")

        if any(keyword.lower() in source.lower() for keyword in allowed_keywords):
            filtered_results.append(doc)

    # If filtered results found, use them
    if filtered_results:
        return filtered_results[:k]

    # Safety fallback: if filter finds nothing, return normal results
    return raw_results[:k]