from app.retrievers.semantic import semantic_search
from app.retrievers.keyword import keyword_search


def hybrid_search(question: str, k: int = 5):
    """
    Combines semantic search and keyword search.
    Removes duplicate documents using source + page.
    """

    semantic_results = semantic_search(question, k=k)
    keyword_results = keyword_search(question, k=k)

    combined_results = semantic_results + keyword_results

    unique_docs = []
    seen = set()

    for doc in combined_results:
        source = doc.metadata.get("source", "unknown")
        page = doc.metadata.get("page", "unknown")
        unique_key = f"{source}-{page}"

        if unique_key not in seen:
            seen.add(unique_key)
            unique_docs.append(doc)

    return unique_docs[:k]