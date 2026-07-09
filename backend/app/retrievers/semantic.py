from app.rag import get_vector_store


def semantic_search(question: str, k: int = 5):
    """
    Performs semantic similarity search using ChromaDB.
    """

    vector_store = get_vector_store()

    results = vector_store.similarity_search(
        question,
        k=k
    )

    return results