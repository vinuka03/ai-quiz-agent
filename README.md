Here’s a complete and polished **README.md** file for your AI-Powered Quiz Generator project, tailored for GitHub:

---

````markdown
# 🧠 AI-Powered Quiz Generator (RAG + Gemma 2B + React + FastAPI)

A full-stack web application that automatically generates short quizzes from uploaded PDF or TXT files using **Retrieval-Augmented Generation (RAG)** and a **locally hosted Gemma 2B** model via Ollama. Ideal for educators, students, and lifelong learners who want to test knowledge from educational materials.

---

## 🚀 Features

- 📄 **Smart Upload**: Accepts `.pdf` and `.txt` files with a max size of **5MB**.
- ⚙️ **Text Chunking & Embedding**: Documents are split into semantic chunks and embedded using SentenceTransformers.
- 🔍 **RAG-based Question Generation**:
  - Relevant chunks are **retrieved** from ChromaDB using LangChain.
  - The retrieved context is sent to a **locally hosted LLM (Gemma 2B)** to generate quiz questions.
- 🎯 **Customizable Quizzes**: Choose between **5 or 10 questions**.
- 🧠 **Live Feedback**: UI shows progress like “Extracting…” and “Generating…”.
- 📥 **Export Ready**: Clean quiz output with a PDF download feature coming soon.
- 💻 **Fully Local**: Runs entirely offline — no API keys, no cloud dependency.

---

## 🛠 Tech Stack

### 🔹 Frontend
- React (Vite)
- Vanilla CSS
- Axios

### 🔹 Backend
- FastAPI
- PyMuPDF (PDF text extraction)
- LangChain
- ChromaDB
- SentenceTransformers

### 🔹 LLM
- Gemma 2B (via [Ollama](https://ollama.com))

---

## 📦 Setup Instructions

### 1. Clone the repository
```bash
git clone https://github.com/yourusername/ai-quiz-generator.git
cd ai-quiz-generator
````

### 2. Backend Setup (Python)

```bash
cd backend
python -m venv venv
source venv/bin/activate  # or venv\Scripts\activate on Windows
pip install -r requirements.txt
```

Make sure **Ollama** is running and you have pulled the Gemma 2B model:

```bash
ollama run gemma2:2b
```

Then start the backend:

```bash
uvicorn main:app --reload
```

### 3. Frontend Setup (React)

```bash
cd ../frontend
npm install
npm run dev
```

---



## 🧠 About RAG

**Retrieval-Augmented Generation (RAG)** is a hybrid architecture where relevant information is retrieved from a knowledge base (here, ChromaDB) and used to ground the response generation from an LLM. In this app:

* User uploads a file → it's chunked and embedded.
* A sample of the document is used to retrieve relevant sections.
* The retrieved context is passed to **Gemma 2B**, ensuring **contextually accurate, document-grounded questions**.

---



---

## 🙌 Acknowledgements

* [LangChain](https://www.langchain.com/)
* [Ollama](https://ollama.com/)
* [ChromaDB](https://www.trychroma.com/)
* [SentenceTransformers](https://www.sbert.net/)

```

---

Let me know if you want me to auto-generate a `requirements.txt` or project folder structure as well.
```

