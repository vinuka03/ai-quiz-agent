import React, { useState } from "react";
import axios from "axios";
import FileUpload from "./components/FileUpload";
import QuizDisplay from "./components/QuizDisplay";
import "./App.css";

function App() {
  const [file, setFile] = useState(null);
  const [quiz, setQuiz] = useState("");
  const [quizCount, setQuizCount] = useState(10);
  const [loadingStep, setLoadingStep] = useState("");  // "extracting" | "generating" | ""
  const [errorMessage, setErrorMessage] = useState("");

  const handleUpload = async () => {
    if (!file) {
      console.warn("❗ No file selected");
      setErrorMessage("Please select a PDF or TXT file.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      setErrorMessage("");
      setLoadingStep("extracting");
      console.log("📤 Uploading:", file.name);

      const uploadRes = await axios.post("http://localhost:8000/upload-pdf/", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      console.log("✅ Uploaded successfully");

      const prompt = uploadRes.data.preview_text.slice(0, 300);
      setLoadingStep("generating");
      console.log("🧠 Generating quiz from prompt...");

      const quizRes = await axios.post("http://localhost:8000/generate-quiz/", {
        question_prompt: prompt,
        num_questions: quizCount,  // 👈 Include selected quiz count
      });

      setQuiz(quizRes.data.quiz);
      console.log("✅ Quiz generated");
    } catch (err) {
      console.error("❌ Error during upload or quiz generation:", err);
      setErrorMessage("Something went wrong during upload or quiz generation.");
    } finally {
      setLoadingStep("");
    }
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    const maxSize = 5 * 1024 * 1024;
    const allowedTypes = ["application/pdf", "text/plain"];

    if (!selectedFile) return;

    if (!allowedTypes.includes(selectedFile.type)) {
      setErrorMessage("Only PDF and Text files are allowed.");
      return;
    }

    if (selectedFile.size > maxSize) {
      setErrorMessage("File size exceeds 5MB limit.");
      return;
    }

    setFile(selectedFile);
    setErrorMessage("");
    console.log("📁 File selected:", selectedFile.name);
  };

  return (
    <div className="app-wrapper">
      <div className="left-panel">
        <img src="/quiz-icon.png" alt="Logo" className="app-logo" />
        <h1 className="main-heading">Quiz And Learn</h1>
        <FileUpload
          onFileChange={handleFileChange}
          onUpload={handleUpload}
          fileName={file?.name}
          loadingStep={loadingStep}
          quizCount={quizCount}
          onQuizCountChange={(e) => setQuizCount(Number(e.target.value))}
        />
        {errorMessage && (
          <div style={{ color: "#e63946", marginTop: "12px", fontWeight: "500" }}>
            ⚠️ {errorMessage}
          </div>
        )}
      </div>

      <div className="right-panel">
        {quiz && <QuizDisplay quiz={quiz} />}
      </div>
    </div>
  );
}

export default App;
