import React from "react";
import "../styles/QuizDisplay.css";

const QuizDisplay = ({ quiz }) => {
  return (
    <div className="quiz-display">
      <h2>Generated Quiz</h2>
      <pre>{quiz}</pre>
    </div>
  );
};

export default QuizDisplay;
