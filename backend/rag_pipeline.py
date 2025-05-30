from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain.embeddings import SentenceTransformerEmbeddings
from langchain.vectorstores import Chroma
import requests
import shutil
import os



def chunk_and_store(text: str, persist_directory="chroma_db"):
    # Split the text into chunks
    splitter = RecursiveCharacterTextSplitter(chunk_size=500, chunk_overlap=100)
    chunks = splitter.create_documents([text])

    # Create the embedding function
    embedding = SentenceTransformerEmbeddings(model_name="all-MiniLM-L6-v2")

    # Overwrite the Chroma DB with new documents (no delete)
    vectordb = Chroma.from_documents(documents=chunks, embedding=embedding, persist_directory=persist_directory)

    vectordb.persist()

    print(f"✅ Stored {len(chunks)} chunks in vector DB.")
    return vectordb


def generate_quiz(question_prompt: str, persist_directory="chroma_db"):
    # Load the vector DB and retriever
    embedding = SentenceTransformerEmbeddings(model_name="all-MiniLM-L6-v2")
    vectordb = Chroma(persist_directory=persist_directory, embedding_function=embedding)
    retriever = vectordb.as_retriever()

    # Retrieve relevant chunks
    docs = retriever.get_relevant_documents(question_prompt)
    context = "\n\n".join([doc.page_content for doc in docs])

    # Prompt for quiz generation
    prompt = f"""
    Based on the following document content, generate 5 short quiz questions.
    Each question should be direct, and only provide the correct answer (no options).
    Document Content:
    {context}
    """

    # Call Ollama local API with Mistral
    response = requests.post(
        "http://localhost:11434/api/generate",
        json={
            "model": "gemma2:2b",   # use the exact tag you pulled
            "prompt": prompt,
            "stream": False
        }
    )

    if response.status_code != 200:
        return f"❌ Error from LLM: {response.text}"

    return response.json().get("response", "⚠️ No response content.")
