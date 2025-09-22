import React, { useState } from "react";
import { useTheme } from "../context/ThemeContext";

const CreatePost = ({ onCreatePost, currentNickname }) => {
  const { isDarkMode } = useTheme();
  const [postText, setPostText] = useState("");
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!postText.trim() || isSubmitting) return;

    setIsSubmitting(true);
    setError("");

    try {
      await onCreatePost({
        text: postText.trim(),
        nickname: currentNickname,
        isAnonymous
      });
      setPostText("");
      setIsAnonymous(false);
    } catch (error) {
      console.error("Error creating post:", error);
      if (error.response?.data?.blocked) {
        setError(error.response.data.message);
      } else {
        setError("Failed to create post. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="transition-colors duration-300">
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <textarea
            value={postText}
            onChange={(e) => setPostText(e.target.value)}
            placeholder="What's on your mind? Share your thoughts, questions, or experiences..."
            className={`w-full p-4 rounded-lg border resize-none transition-colors duration-300 ${
              isDarkMode
                ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500"
                : "bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-blue-500"
            } focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
            rows="4"
            maxLength="1000"
          />
          <div className={`text-right text-sm mt-1 ${
            isDarkMode ? "text-gray-400" : "text-gray-500"
          }`}>
            {postText.length}/1000
          </div>
        </div>

        {error && (
          <div className="mb-4 p-3 rounded-lg bg-red-100 border border-red-300 text-red-700">
            <p className="text-sm">{error}</p>
          </div>
        )}

        <div className="flex items-center justify-between">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={isAnonymous}
              onChange={(e) => setIsAnonymous(e.target.checked)}
              className="rounded"
            />
            <span className={`text-sm ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>
              Post anonymously
            </span>
          </label>

          <button
            type="submit"
            disabled={!postText.trim() || isSubmitting}
            className={`px-6 py-2 rounded-lg font-medium transition-all duration-200 ${
              !postText.trim() || isSubmitting
                ? isDarkMode
                  ? "bg-gray-700 text-gray-500 cursor-not-allowed"
                  : "bg-gray-200 text-gray-400 cursor-not-allowed"
                : isDarkMode
                  ? "bg-blue-600 text-white hover:bg-blue-700 transform hover:scale-105"
                  : "bg-blue-500 text-white hover:bg-blue-600 transform hover:scale-105"
            }`}
          >
            {isSubmitting ? "Posting..." : "Create Post"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreatePost;
