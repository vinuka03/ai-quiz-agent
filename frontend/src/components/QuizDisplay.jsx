import React from "react";
import { jsPDF } from "jspdf";
import "../styles/QuizDisplay.css";

const QuizDisplay = ({ quiz }) => {
  const downloadPDF = () => {
    const doc = new jsPDF();
    const lines = doc.splitTextToSize(quiz, 180);
    doc.text(lines, 10, 10);
    doc.save("generated-quiz.pdf");
  };

  return (
    <div className="quiz-display">
      <h2>Generated Quiz</h2>
      <pre>{quiz}</pre>
      <button onClick={downloadPDF} className="download-button">
        📥 Download as PDF
      </button>
    </div>
  );
};

export default QuizDisplay;
