from pathlib import Path
from langchain_community.document_loaders import PyPDFLoader

KNOWLEDGE_BASE_PATH = Path("knowledge_base")

def load_all_pdfs():
    documents = []

    pdf_files = list(KNOWLEDGE_BASE_PATH.rglob("*.pdf"))

    print(f"Found {len(pdf_files)} PDF files")

    for pdf_file in pdf_files:
        print(f"Loading: {pdf_file}")

        loader = PyPDFLoader(str(pdf_file))
        docs = loader.load()

        for doc in docs:
            doc.metadata["source"] = str(pdf_file)

        documents.extend(docs)

    print(f"Loaded {len(documents)} pages")
    return documents