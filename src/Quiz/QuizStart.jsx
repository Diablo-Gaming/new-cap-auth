import React from "react";
import { NavLink } from "react-router-dom";

const QuizStart = () => {
  return (
    <div className="min-h-screen bg-[#bcccdc] flex items-center justify-center px-4">
      <div className="bg-white rounded-lg shadow-md p-20 w-full max-w-md text-center">
        <h1 className="text-2xl font-bold">Ready to begin? </h1>
        <NavLink to="/quiz">
          <button className="bg-[#f6ca56] w-full max-w-[300px] h-[40px] rounded-[10px] mt-8 hover:bg-[#e5b945] transition-colors">
            Start the Quiz
          </button>
        </NavLink>
        <NavLink to="/">
          <button className="bg-[#f6ca56] w-full max-w-[300px] h-[40px] rounded-[10px] mt-8 hover:bg-[#e5b945] transition-colors">
            Maybe Later
          </button>
        </NavLink>
      </div>
    </div>
  );
};

export default QuizStart;
