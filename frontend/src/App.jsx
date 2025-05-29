import React, { useState } from "react";
import axios from "axios";
import FileUpload from "./components/FileUpload";
import QuizDisplay from "./components/QuizDisplay";
import "./App.css";

function App() {
  const [file, setFile] = useState(null);
  const [quiz, setQuiz] = useState("");
  const [loading, setLoading] = useState(false);

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a PDF file");
      console.warn("❗ No file selected");
      return;
    }

    console.log("📤 Upload started for file:", file.name);
    const formData = new FormData();
    formData.append("file", file);

    try {
      setLoading(true);
      console.log("🔁 Sending POST /upload-pdf/");
      const uploadRes = await axios.post("http://localhost:8000/upload-pdf/", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      console.log("✅ Upload response:", uploadRes.data);

      const prompt = uploadRes.data.preview_text.slice(0, 300);
      console.log("🧠 Prompt to send to LLM:", prompt);

      console.log("🔁 Sending POST /generate-quiz/");
      const quizRes = await axios.post("http://localhost:8000/generate-quiz/", {
        question_prompt: prompt,
      });

      console.log("✅ Quiz response received");
      setQuiz(quizRes.data.quiz);
    } catch (err) {
      console.error("❌ Upload or generation failed:", err);
      alert("Failed to upload or generate quiz");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-wrapper">
      <div className="left-panel">
        <h1 className="main-heading">Quiz And Learn</h1>
        <FileUpload
          onFileChange={(e) => {
            console.log("📁 File selected:", e.target.files[0]?.name);
            setFile(e.target.files[0]);
          }}
          onUpload={handleUpload}
          loading={loading}
          fileName={file?.name}
        />
      </div>

      <div className="right-panel">
        {quiz && <QuizDisplay quiz={quiz} />}
      </div>
    </div>
  );
}

export default App;
