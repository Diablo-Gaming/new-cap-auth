import React, { useState } from "react";
import { quizData } from "../Data/Data";

const Quiz = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [isQuizComplete, setIsQuizComplete] = useState(false);

  // Save the selected answer
  const handleAnswerSelect = (optionIndex) => {
    setUserAnswers({
      ...userAnswers,
      [quizData[currentQuestionIndex].id]: optionIndex,
    });
  };

  // Move to the next question or finish quiz
  const handleNext = () => {
    if (currentQuestionIndex < quizData.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setIsQuizComplete(true);
    }
  };

  // Move to the previous question
  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  // Calculate score and results
  const totalScore = Object.values(userAnswers).reduce((sum, val) => sum + val, 0);
  const maxScore = quizData.length * 3;
  const scorePercentage = Math.round((totalScore / maxScore) * 100);

  // Determine anxiety level
  const getAnxietyLevel = () => {
    if (scorePercentage < 30) return "Minimal Anxiety";
    if (scorePercentage < 60) return "Mild Anxiety";
    if (scorePercentage < 80) return "Moderate Anxiety Levels";
    return "High Anxiety Levels";
  };

  const motivationalQuote = "Taking care of your mental health is a sign of strength, not weakness.";

  // === Show Results Screen ===
  if (isQuizComplete) {
    return (
      <div className="min-h-screen bg-[#bcccdc] flex items-center justify-center px-4">
        <div className="bg-white rounded-lg shadow-md p-6 w-full max-w-md text-center">
          <h2 className="text-2xl font-bold mb-2">Your Mental Health Results</h2>
          <p className="text-sm mb-4">Here's a quick summary based on your responses:</p>

          <div className="bg-yellow-300 rounded-full w-32 h-32 flex items-center justify-center mx-auto mb-6">
            <span className="text-3xl font-bold">{scorePercentage}%</span>
          </div>

          <h3 className="text-xl font-semibold mb-2">{getAnxietyLevel()}</h3>
          <p className="text-sm mb-6">
            You may be experiencing <strong>{getAnxietyLevel().toLowerCase()}</strong>. 
            Consider getting support if needed.
          </p>

          <blockquote className="italic text-gray-600 border-l-4 border-yellow-400 pl-4 mb-6">
            “{motivationalQuote}”
          </blockquote>

          <div className="text-left mb-6 space-y-4">
            <div>
              <strong>Talk Therapy</strong>
              <p className="text-sm">
                Talk to a professional who can guide you with coping strategies.
              </p>
            </div>
            <div>
              <strong>Stress Management</strong>
              <p className="text-sm">Try breathing, meditation, or journaling every day.</p>
            </div>
          </div>

          <button className="bg-yellow-400 text-white px-4 py-2 rounded hover:bg-yellow-500">
            Schedule a Consultation
          </button>
        </div>
      </div>
    );
  }

  // === Show Quiz Screen ===
  const currentQuestion = quizData[currentQuestionIndex];
  const selectedAnswer = userAnswers[currentQuestion.id];

  return (
    <div className="min-h-screen bg-[#bcccdc] flex items-center justify-center px-4">
      <div className="bg-white rounded-lg shadow-md p-6 w-full max-w-2xl">
        <h1 className="text-2xl font-bold text-center mb-2">Mood Assessment Quiz</h1>
        <p className="text-sm text-center font-medium mb-4">
          Question {currentQuestionIndex + 1} of {quizData.length}
        </p>

        <p className="text-lg font-medium mb-6">{currentQuestion.question}</p>

        {/* Options */}
        <div className="space-y-3">
          {currentQuestion.options.map((optionText, optionIndex) => (
            <label
              key={optionIndex}
              className={`flex items-center space-x-3 p-2 rounded-md cursor-pointer transition ${
                selectedAnswer === optionIndex
                  ? "bg-blue-100 border-l-4 border-blue-500"
                  : "hover:bg-gray-50"
              }`}
            >
              <input
                type="radio"
                name={currentQuestion.id}
                checked={selectedAnswer === optionIndex}
                onChange={() => handleAnswerSelect(optionIndex)}
                className="form-radio text-blue-600"
              />
              <span className="text-gray-800">{optionText}</span>
            </label>
          ))}
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-6">
          <button
            onClick={handlePrevious}
            disabled={currentQuestionIndex === 0}
            className="bg-yellow-400 text-white px-4 py-2 rounded hover:bg-yellow-500 disabled:opacity-50"
          >
            Previous
          </button>
          <button
            onClick={handleNext}
            className="bg-yellow-400 text-white px-4 py-2 rounded hover:bg-yellow-500"
          >
            {currentQuestionIndex === quizData.length - 1 ? "Submit" : "Next"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Quiz;
