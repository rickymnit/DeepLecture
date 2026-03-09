from rag.embeddings import embed_texts
from rag.vector_store import vector_store


def retrieve(question, k=5):

    query_embedding = embed_texts([question])

    results = vector_store.search(query_embedding, k)

    context = "\n".join([r["text"] for r in results])

    return context, results