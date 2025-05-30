import React from "react";
import "../styles/FileUpload.css";

const FileUpload = ({ onUpload, onFileChange, fileName, loading }) => {
  return (
    <div className="upload-controls">
      <label htmlFor="file-upload" className="custom-file-upload">
        📁 Upload File
      </label>
      <input
        type="file"
        id="file-upload"
        className="file-input-hidden"
        onChange={onFileChange}
      />

      <button onClick={onUpload} disabled={loading}>
        {loading ? "Generating..." : "Generate Quiz"}
      </button>

    {loading && (
  <div
    className="loading-spinner"
    style={{
      display: "flex",
      alignItems: "center",
      marginTop: "10px",
      gap: "10px",
      color: "#0d47a1", // 💜 Text color (change to what you want)
    }}
  >
    <div
      className="spinner"
      style={{
        width: "18px",
        height: "18px",
        border: "3px solid #0d47a1",         // 👈 background ring
        borderTop: "3px solidrgb(22, 82, 234)",    // 👈 spinning color
        borderRadius: "50%",
        animation: "spin 1s linear infinite",
      }}
    ></div>
    <span>Please wait, quiz is being generated...</span>
  </div>
)}



      {fileName && <p className="file-name">📄 {fileName}</p>}
    </div>
  );
};

export default FileUpload;
