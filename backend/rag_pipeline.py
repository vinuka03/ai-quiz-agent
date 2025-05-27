from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain.embeddings import SentenceTransformerEmbeddings
from langchain.vectorstores import Chroma
import os

def chunk_and_store(text: str, persist_directory="chroma_db"):
    # Split the text into chunks
    splitter = RecursiveCharacterTextSplitter(chunk_size=500, chunk_overlap=100)
    chunks = splitter.create_documents([text])

    # Create the embedding function
    embedding = SentenceTransformerEmbeddings(model_name="all-MiniLM-L6-v2")

    # Create or overwrite a Chroma DB
    vectordb = Chroma.from_documents(documents=chunks, embedding=embedding, persist_directory=persist_directory)
    vectordb.persist()

    print(f"✅ Stored {len(chunks)} chunks in vector DB.")
    return vectordb



# Function: Generate Quiz via Local LLM (Ollama)
# -----------------------------------------------
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
    Based on the following document content, generate 3 multiple choice quiz questions.
    Each question should have 4 options (A-D) and clearly indicate the correct answer.

    Document Content:
    {context}
    """

    # Call local model via Ollama API
    response = requests.post(
        "http://localhost:11434/api/generate",
        json={
            "model": "mistral",  # change to your model if needed
            "prompt": prompt,
            "stream": False
        }
    )

    return response.json()["response"]
