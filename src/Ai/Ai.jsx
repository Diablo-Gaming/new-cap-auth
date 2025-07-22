import { useState } from "react";
import ai from "../assets/ai.png";

const Ai = () => {
  // State for messages and the current input
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");

  // Called when user clicks "Send" or presses Enter
  const handleSendMessage = () => {
    const userMessage = inputValue.trim();
    if (userMessage) {
      // Add user's message to the chat
      setMessages([...messages, { text: userMessage, sender: "user" }]);
      setInputValue("");

      // Simulate assistant response
      setTimeout(() => {
        setMessages((prevMessages) => [
          ...prevMessages,
          {
            text: "I'm here to listen and help. Could you tell me more about how you're feeling?",
            sender: "assistant",
          },
        ]);
      }, 1000); // 1 second delay
    }
  };

  // Press Enter to send message
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  // Predefined quick replies
  const quickReplies = [
    "Talk About Feelings",
    "Self-Care Tips",
    "Stress Management",
    "Anxiety Help",
  ];

  // Handle when user clicks a quick reply button
  const handleQuickReply = (reply) => {
    setMessages([...messages, { text: reply, sender: "user" }]);

    setTimeout(() => {
      let replyText;

      // Different assistant replies based on the button clicked
      if (reply === "Talk About Feelings") {
        replyText = "It's good to talk about your feelings. What's been on your mind lately?";
      } else if (reply === "Self-Care Tips") {
        replyText =
          "Here are some self-care ideas:\n- Take a short walk\n- Breathe deeply\n- Drink some water\n- Listen to calming music";
      } else if (reply === "Stress Management") {
        replyText =
          "Managing stress is important. Would you like to try a simple breathing exercise?";
      } else if (reply === "Anxiety Help") {
        replyText =
          "Anxiety can be hard. Try focusing on your breath. Would you like help with that?";
      } else {
        replyText = "I'm here to help. Tell me more about how you're feeling.";
      }

      // Add assistant reply to chat
      setMessages((prev) => [...prev, { text: replyText, sender: "assistant" }]);
    }, 1000);
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#bcccdc] p-4 lg:p-20 lg:mt-[5rem]">
      {/* Header */}
      <header className="bg-white p-4 shadow-md rounded-t-[20px]">
        <h1 className="text-2xl font-bold text-center">Mental Health Assistant</h1>
        <p className="text-sm text-center text-blue-700 mt-1">
          I'm here to support you. Share anything that's on your mind.
        </p>
      </header>

      {/* Chat body */}
      <div className="flex-1 overflow-y-auto bg-white p-4">
        {/* Welcome message */}
        <div className="flex lg:ml-[19rem] items-center mb-6">
          <img
            src={ai}
            alt="AI Assistant"
            className="w-[200px] h-auto rounded-[20px] border border-black mb-4"
          />
          <div className="bg-blue-100 p-4 rounded-lg w-full max-w-2xl">
            <h2 className="text-lg font-semibold">
              Hello! I'm your Mental Health Assistant.
            </h2>
            <p className="text-blue-700 mt-1">
              You can talk to me anytime, I'm here for you.
            </p>
          </div>
        </div>

        {/* Quick reply buttons */}
        <div className="mb-6 text-center">
          <h3 className="text-md font-medium text-gray-700 mb-2">
            How can I help you today?
          </h3>
          <div className="flex flex-wrap justify-center gap-2">
            {quickReplies.map((text, index) => (
              <button
                key={index}
                onClick={() => handleQuickReply(text)}
                className="bg-yellow-500 hover:bg-yellow-400 border px-4 py-2 rounded-full text-sm"
              >
                {text}
              </button>
            ))}
          </div>
        </div>

        {/* Messages list */}
        <div className="space-y-3">
          {messages.map((msg, i) => (
            <div key={i} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
              <div
                className={`px-4 py-2 rounded-lg max-w-sm ${
                  msg.sender === "user"
                    ? "bg-blue-500 text-white rounded-br-none"
                    : "bg-gray-200 text-gray-800 rounded-bl-none"
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Input area */}
      <footer className="bg-white p-4 border-t mt-2">
        <div className="flex items-center gap-4">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type your message here..."
            className="flex-1 border border-gray-300 px-4 py-2 rounded-lg focus:outline-none"
          />
          <button
            onClick={handleSendMessage}
            className="bg-yellow-500 hover:bg-yellow-400 text-white px-4 py-2 rounded-full"
          >
            Send
          </button>
        </div>
        <p className="text-xs text-gray-500 text-center mt-2">
          If you're in a crisis, please contact emergency services immediately.
        </p>
      </footer>
    </div>
  );
};

export default Ai;
