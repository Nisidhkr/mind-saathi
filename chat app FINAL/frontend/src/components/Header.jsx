import React from "react";
import { useTheme } from "../context/ThemeContext";

export default function Header({ nickname }) {
  const { isDarkMode, toggleDarkMode } = useTheme();

  const handleBackToDashboard = () => {
    // Try to navigate parent window (if in iframe)
    if (window.parent && window.parent !== window) {
      window.parent.location.href = 'http://localhost:3000/dashboard';
    } else {
      // If not in iframe, navigate current window
      window.location.href = 'http://localhost:3000/dashboard';
    }
  };

  return (
    <div className={`px-8 py-6 flex items-center justify-between shadow-lg transition-colors duration-300 ${
      isDarkMode 
        ? "bg-gradient-to-r from-gray-800 to-gray-900 text-white" 
        : "bg-gradient-to-r from-perylene-600 to-perylene-600 text-white"
    }`}>
      <div>
        <h1 className="text-2xl font-bold mb-1">Welcome, {nickname}</h1>
        <p className={`text-sm font-light ${
          isDarkMode ? "text-gray-300" : "text-perylene-100"
        }`}>
          Your safe space for meaningful conversations
        </p>
      </div>
      
      <div className="flex items-center space-x-6">
        <div className="text-right">
          <span className="text-lg font-semibold">STIGMA-FREE CHAT</span>
          <div className={`text-sm font-light mt-1 ${
            isDarkMode ? "text-gray-300" : "text-perylene-100"
          }`}>
            💬 Anonymous • Safe • Supportive
          </div>
        </div>
        
        {/* Back to Dashboard Button */}
        <button
          onClick={handleBackToDashboard}
          className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 hover:scale-105 ${
            isDarkMode
              ? "bg-gray-700 text-white hover:bg-gray-600"
              : "bg-white/20 text-white hover:bg-white/30"
          }`}
          title="Back to Dashboard"
        >
          ← Dashboard
        </button>
        
        {/* Dark Mode Toggle */}
        <button
          onClick={toggleDarkMode}
          className={`p-3 rounded-full transition-all duration-300 hover:scale-110 ${
            isDarkMode
              ? "bg-yellow-400 text-gray-900 hover:bg-yellow-300"
              : "bg-white/20 text-white hover:bg-white/30"
          }`}
          title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
        >
          {isDarkMode ? (
            // Sun icon for light mode
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
            </svg>
          ) : (
            // Moon icon for dark mode
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
              <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
            </svg>
          )}
        </button>
      </div>
    </div>
  );
}
