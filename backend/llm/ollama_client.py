import ollama
from config import OLLAMA_MODEL


def generate_answer(question, context):

    prompt = f"""
Use the following context to answer the question.

Context:
{context}

Question:
{question}

Answer clearly.
"""

    response = ollama.chat(
        model=OLLAMA_MODEL,
        messages=[{"role": "user", "content": prompt}]
    )

    return response["message"]["content"]