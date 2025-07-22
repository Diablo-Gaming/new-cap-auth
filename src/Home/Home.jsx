import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { HOME } from "../Data/Data"; // Article data
import { useState } from "react";

const Home = () => {
  const navigate = useNavigate();
  const [chatOpen, setChatOpen] = useState(false);

  // Navigate to the quiz page
  const goToQuiz = () => {
    navigate("/quiz1");
  };

  const goToTherapist = () => {
    navigate("/therapist");
  };

  // Navigate to full article page
  const handleReadmore = (id) => {
    console.log("Navigating to id:", id);
    navigate(`/readmore/${id}`);
  };

  return (
    <div className="flex flex-col items-center w-full overflow-x-hidden pt-[56px]">
      {/* Hero Section */}
      <div
        className="flex flex-col lg:flex-row-reverse lg:gap-40 items-center justify-center w-full py-12 px-4 gap-6  bg-[#bcccdc] md:flex-row md:py-16 md:px-8 lg:px-16 max-w-screen overflow-x-hidden"
        data-aos="zoom-out"
        data-aos-duration="500"
        data-aos-once="true"
      >
        <img
          src="homeimage.png"
          className="rounded-md w-full max-w-sm sm:max-w-md lg:max-w-lg"
          alt="Empower Your Mind"
        />
        <div className="flex flex-col items-center md:items-start md:max-w-[50%]">
          <h2 className="text-2xl font-bold text-center md:text-left md:text-3xl lg:text-4xl">
            Empower Your Mind,
            <br />
            One Step at a Time
          </h2>
          <button
            onClick={goToTherapist}
            className="bg-[#f6ca56] w-full max-w-[300px] h-[40px] rounded-[10px] mt-4 hover:bg-[#e5b945] transition-colors"
          >
            Find the therapist
          </button>
        </div>
      </div>

      {/* Quiz Section */}
      <div className="flex flex-col items-center text-center w-full px-4 py-12 md:px-8 md:py-16  lg:bg-white">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold max-w-[800px]">
          Your journey to a brighter mind starts here.
        </h2>
        <p className="text-xl md:text-2xl mt-4 max-w-[800px]">
          Take our free mental health quiz and get matched with the right
          therapist.
        </p>
        <button
          onClick={goToQuiz}
          className="bg-[#f6ca56] hover:bg-[#e5b945] mt-6 w-full max-w-[300px] h-[40px] rounded-[10px]"
        >
          Take free quiz
        </button>
      </div>

      {/* Articles Section */}
      <div className="flex flex-col items-center w-full px-4 py-12 md:px-8 md:py-16 bg-[#bcccdc]">
        <h3 className="text-xl md:text-2xl font-bold mb-8">Latest Articles</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-[1200px]">
          {HOME.map((article) => (
            <Link
              key={article.id}
              to={`/blogs/${article.id}`}
              className="bg-white p-4 rounded-[10px] hover:shadow-lg transition-shadow"
            >
              <img
                src={article.image}
                alt={article.title}
                className="w-full h-auto rounded-[8px]"
              />
              <h4 className="text-lg font-bold mt-4">{article.title}</h4>
              <p className="text-sm mt-2">{article.description}</p>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  handleReadmore(article.id);
                }}
                className="text-sm mt-4 text-blue-600 hover:underline"
              >
                Read more →
              </button>
            </Link>
          ))}
        </div>
      </div>
      {/* Floating Chat Button */}
      <button
        onClick={() => setChatOpen(!chatOpen)}
        className="fixed bottom-6 right-6 z-40 bg-[#f6ca56] hover:bg-[#e5b945] cursor-pointer p-4 rounded-full shadow-lg"
      >
        <img src="bot.png" alt="chatbot" className="w-9" />
      </button>

      {/* Chat Popup */}
      {chatOpen && (
        <div className="fixed bottom-5 right-6 z-50 w-80 h-[400px] bg-white rounded-lg shadow-2xl border border-gray-300 flex flex-col overflow-hidden ">
          <div className="bg-yellow-400 px-4 py-3 text-sm font-semibold flex justify-between items-center ">
            <span>Chatbot</span>
            <button
              onClick={() => setChatOpen(false)}
              className="text-black hover:cursor-pointer"
            >
              ✕
            </button>
          </div>
          <div className="flex-1 p-4 overflow-y-auto text-sm">
            <div className="mb-2">
              <div className="bg-gray-200 p-2 rounded-lg inline-block">
                Hi! I'm here to help you with mental health support. Whats on
                your mind?
              </div>
            </div>
          </div>
          <div className="p-2 border-t border-gray-200">
            <div className="flex items-center gap-2">
              <input
                type="text"
                placeholder="Type a message..."
                className="flex-1 px-3 py-2 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-100"
              />
              <button className="bg-yellow-400 px-4 py-2 text-sm rounded-md hover:bg-yellow-300 transition">
                →
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
