from app.knowledge_loader import load_all_pdfs


def keyword_search(question: str, k: int = 5):
    """
    Simple keyword-based search over loaded PDF documents.
    It checks whether important words from the question appear in document content or source path.
    """

    documents = load_all_pdfs()

    query_words = [
        word.lower()
        for word in question.split()
        if len(word) > 3
    ]

    scored_docs = []

    for doc in documents:
        content = doc.page_content.lower()
        source = doc.metadata.get("source", "").lower()

        score = 0

        for word in query_words:
            if word in content:
                score += 2
            if word in source:
                score += 3

        if score > 0:
            scored_docs.append((score, doc))

    scored_docs.sort(key=lambda x: x[0], reverse=True)

    return [doc for score, doc in scored_docs[:k]]