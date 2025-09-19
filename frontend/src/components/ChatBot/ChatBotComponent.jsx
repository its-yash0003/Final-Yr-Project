import React, { useState, useEffect, useRef } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import ChatHistory from "./ChatHistory";
import Loading from "./Loading";
import Prompts from "./Prompts";

const ChatbotComponent = () => {
  const [userInput, setUserInput] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [genAI, setGenAI] = useState(null);
  const [model, setModel] = useState(null);
  const chatContainerRef = useRef(null);

  useEffect(() => {
    const apiKey = import.meta.env.VITE_REACT_APP_GEMINI_API_KEY;
    if (apiKey) {
      const ai = new GoogleGenerativeAI(apiKey);
      setGenAI(ai);
      setModel(ai.getGenerativeModel({ model: "gemini-1.5-flash" }));
    } else {
      console.error("API Key not found in environment variables");
    }
  }, []);

  const handleUserInput = (e) => {
    setUserInput(e.target.value);
  };

  const sendMessage = async () => {
    if (userInput.trim() === "" || !model) return;
    setIsLoading(true);
    try {
      const result = await model.generateContent(userInput);
      const response = await result.response;
      setChatHistory((prev) => [
        ...prev,
        { type: "user", message: userInput },
        { type: "bot", message: response.text() },
      ]);
    } catch (error) {
      console.error("Error sending message:", error);
      setChatHistory((prev) => [
        ...prev,
        { type: "user", message: userInput },
        { type: "bot", message: "Sorry, I encountered an error. Please try again." },
      ]);
    } finally {
      setUserInput("");
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const clearChat = () => {
    setChatHistory([]);
  };

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [chatHistory]);

  return (
    <>
      {/* Spacer below fixed navbar (assumes navbar height is h-16 = 64px) */}
      <div className="h-16" />

      <div className="flex flex-col md:flex-row gap-4 p-4 h-[calc(100vh-4rem)]">
        {/* Sidebar with Prompts */}
        <div className="md:w-1/4 w-full bg-gray-500 rounded-3xl p-4 h-full overflow-y-auto">
          <Prompts onPromptSelect={(prompt) => setUserInput(prompt)} />
        </div>

        {/* Chat UI */}
        <div className="md:w-3/4 w-full flex flex-col bg-white rounded-3xl p-4 shadow h-full">
          <h2 className="text-2xl font-bold text-center mb-4 text-black">
            Health Assistant
          </h2>

          {/* Chat Area */}
          <div
            ref={chatContainerRef}
            className="flex-grow overflow-y-auto bg-gray-100 p-4 rounded-lg shadow-inner"
          >
            <ChatHistory chatHistory={chatHistory} />
            <Loading isLoading={isLoading} />
          </div>

          {/* Input Area */}
          <div className="flex mt-4">
            <input
              type="text"
              className="flex-grow px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              style={{ backgroundColor: "white", color: "black", caretColor: "black" }}
              placeholder="Ask about your health..."
              value={userInput}
              onChange={handleUserInput}
              onKeyDown={handleKeyDown}
            />
            <button
              className="px-4 py-2 ml-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 focus:outline-none"
              onClick={sendMessage}
              disabled={isLoading || !model}
            >
              Send
            </button>
          </div>

          <button
            className="mt-4 px-4 py-2 rounded-lg bg-gray-400 text-white hover:bg-gray-500 focus:outline-none"
            onClick={clearChat}
          >
            Clear Chat
          </button>
        </div>
      </div>
    </>
  );
};

export default ChatbotComponent;
