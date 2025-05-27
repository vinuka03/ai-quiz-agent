from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
import shutil
from pdf_utils import extract_text_from_pdf
from rag_pipeline import chunk_and_store, generate_quiz
from pydantic import BaseModel

app = FastAPI()

# Allow frontend requests (CORS)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, replace with frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def root():
    return {"message": "AI Quiz Agent Backend is Running"}

@app.post("/upload-pdf/")
async def upload_pdf(file: UploadFile = File(...)):
    # Save the uploaded PDF locally
    with open(file.filename, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    # Extract text
    extracted_text = extract_text_from_pdf(file.filename)

    # Store embeddings in ChromaDB
    chunk_and_store(extracted_text)

    return {
        "filename": file.filename,
        "preview_text": extracted_text[:500]
    }

# Pydantic model for quiz prompt input
class QuizRequest(BaseModel):
    question_prompt: str

@app.post("/generate-quiz/")
async def generate_quiz_endpoint(request: QuizRequest):
    quiz = generate_quiz(request.question_prompt)
    return {"quiz": quiz}
