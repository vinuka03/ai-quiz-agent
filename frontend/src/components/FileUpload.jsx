import React from "react";
import "../styles/FileUpload.css";

const FileUpload = ({ onUpload, onFileChange, fileName, loadingStep, quizCount, onQuizCountChange }) => {
  const isLoading = loadingStep !== "";

  const getLoadingMessage = () => {
    if (loadingStep === "extracting") return "📄 Extracting text from file...";
    if (loadingStep === "generating") return "🧠 Generating quiz...";
    return null;
  };

  return (
    <div className="upload-controls" style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      
      {/* Buttons Row */}
      <div style={{ display: "flex", gap: "16px", marginBottom: "10px" }}>
        <label htmlFor="file-upload" className="upload-button">
          📁 Upload File
        </label>
        <input
          type="file"
          id="file-upload"
          className="file-input-hidden"
          onChange={onFileChange}
        />

        <button   className="generate-button" onClick={onUpload} disabled={isLoading}>
          {isLoading ? "Please wait..." : "Generate Quiz"}
        </button>
      </div>

      {/* Dropdown below buttons */}
      <div style={{ marginBottom: "12px", textAlign: "center",color:"#3478e3" }}>
        <label htmlFor="quiz-count" style={{ marginRight: "8px" }}>Number of Questions:</label>
        <select
          id="quiz-count"
          value={quizCount}
          onChange={onQuizCountChange}
          disabled={isLoading}
          style={{ padding: "4px 8px" }}
        >
          <option value={5}>5 Questions</option>
          <option value={10}>10 Questions</option>
        </select>
      </div>

      {/* Spinner */}
      {isLoading && (
        <div
          className="loading-spinner"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            marginBottom: "10px",
            color: "#0d47a1",
          }}
        >
          <div
            className="spinner"
            style={{
              width: "18px",
              height: "18px",
              border: "3px solid #ccc",
              borderTop: "3px solid #0d47a1",
              borderRadius: "50%",
              animation: "spin 1s linear infinite",
            }}
          ></div>
          <span>{getLoadingMessage()}</span>
        </div>
      )}

      {/* File name */}
      {fileName && <p className="file-name">📄 {fileName}</p>}
    </div>
  );
};

export default FileUpload;
