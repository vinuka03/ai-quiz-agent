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

      {fileName && <p className="file-name">📄 {fileName}</p>}
    </div>
  );
};

export default FileUpload;
