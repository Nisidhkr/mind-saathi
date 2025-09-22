import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import { useSocket } from "../context/SocketContext";
import { useTheme } from "../context/ThemeContext";
import PostCard from "../components/PostCard";
import CreatePost from "../components/CreatePost";

const Posts = () => {
  const navigate = useNavigate();
  const { nickname } = useSocket();
  const { isDarkMode } = useTheme();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState("recent");
  const [error, setError] = useState("");
  const [showCreatePost, setShowCreatePost] = useState(false);

  // Fetch posts
  const fetchPosts = async () => {
    try {
      setLoading(true);
      console.log("🔄 Fetching posts from:", api.defaults.baseURL + `/posts?sortBy=${sortBy}`);
      const response = await api.get(`/posts?sortBy=${sortBy}`);
      console.log("✅ Posts fetched successfully:", response.data);
      setPosts(response.data);
      setError("");
    } catch (error) {
      console.error("❌ Error fetching posts:", error);
      setError("Failed to load posts. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [sortBy]);

  // Create new post
  const handleCreatePost = async (postData) => {
    try {
      const response = await api.post(`/posts`, postData);
      setPosts([response.data, ...posts]);
      setShowCreatePost(false); // Close create form after successful post
      return response.data;
    } catch (error) {
      console.error("Error creating post:", error);
      throw error;
    }
  };

  // Toggle helpful vote
  const handleHelpfulVote = async (postId, voteData) => {
    try {
      const response = await api.post(`/posts/${postId}/helpful`, voteData);
      setPosts(posts.map(post => 
        post._id === postId ? response.data : post
      ));
    } catch (error) {
      console.error("Error toggling helpful vote:", error);
    }
  };

  // Toggle reaction
  const handleReaction = async (postId, reactionData) => {
    try {
      const response = await api.post(`/posts/${postId}/reactions`, reactionData);
      setPosts(posts.map(post => 
        post._id === postId ? response.data : post
      ));
    } catch (error) {
      console.error("Error toggling reaction:", error);
    }
  };

  // Add comment
  const handleComment = async (postId, commentData) => {
    try {
      const response = await api.post(`/posts/${postId}/comments`, commentData);
      setPosts(posts.map(post => 
        post._id === postId ? response.data : post
      ));
    } catch (error) {
      console.error("Error adding comment:", error);
      throw error;
    }
  };

  const handleBackToDashboard = () => {
    const dashboardUrl = import.meta.env.VITE_DASHBOARD_URL || 'http://localhost:5173/dashboard';
    // Try to navigate parent window (if in iframe)
    if (window.parent && window.parent !== window) {
      window.parent.location.href = dashboardUrl;
    } else {
      // If not in iframe, navigate current window
      window.location.href = dashboardUrl;
    }
  };

  const handleGoToChat = () => {
    navigate("/home");
  };

  if (!nickname) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${
        isDarkMode ? "bg-gray-900" : "bg-gray-50"
      }`}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className={isDarkMode ? "text-gray-300" : "text-gray-600"}>
            Connecting...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      isDarkMode ? "bg-gray-900" : "bg-gray-50"
    }`}>
      {/* Header */}
      <div className={`sticky top-0 z-10 shadow-lg transition-colors duration-300 ${
        isDarkMode 
          ? "bg-gradient-to-r from-gray-800 to-gray-900" 
          : "bg-gradient-to-r from-perylene-600 to-perylene-600"
      }`}>
        <div className="max-w-6xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={handleBackToDashboard}
                className="p-2 rounded-lg transition-colors duration-200 text-white/80 hover:text-white hover:bg-white/10"
              >
                ← Dashboard
              </button>
              <div>
                <h1 className="text-2xl font-bold text-white mb-1">
                  Community Posts
                </h1>
                <p className={`text-sm font-light ${
                  isDarkMode ? "text-gray-300" : "text-perylene-100"
                }`}>
                  📝 Share thoughts • Get support • Connect safely
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <button
                onClick={handleGoToChat}
                className="px-4 py-2 rounded-lg font-medium transition-all duration-200 bg-white/20 text-white hover:bg-white/30"
              >
                💬 Group Chat
              </button>
              
              <div className="text-right">
                <span className="text-white font-semibold">Welcome, {nickname}!</span>
                <div className={`text-sm font-light ${
                  isDarkMode ? "text-gray-300" : "text-perylene-100"
                }`}>
                  Anonymous • Safe • Supportive
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-6 py-6">
        {/* Sort Options */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <span className={`text-sm font-medium ${
              isDarkMode ? "text-gray-300" : "text-gray-700"
            }`}>
              Sort by:
            </span>
            <div className="flex gap-2">
              <button
                onClick={() => setSortBy("recent")}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  sortBy === "recent"
                    ? isDarkMode
                      ? "bg-perylene-600 text-white"
                      : "bg-perylene-600 text-white"
                    : isDarkMode
                      ? "bg-gray-700 text-gray-300 hover:bg-gray-600"
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                📅 Most Recent
              </button>
              <button
                onClick={() => setSortBy("popular")}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  sortBy === "popular"
                    ? isDarkMode
                      ? "bg-perylene-600 text-white"
                      : "bg-perylene-600 text-white"
                    : isDarkMode
                      ? "bg-gray-700 text-gray-300 hover:bg-gray-600"
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                🔥 Most Popular
              </button>
              <button
                onClick={() => setSortBy("counselor-flagged")}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  sortBy === "counselor-flagged"
                    ? isDarkMode
                      ? "bg-orange-600 text-white"
                      : "bg-orange-500 text-white"
                    : isDarkMode
                      ? "bg-gray-700 text-gray-300 hover:bg-gray-600"
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                🚩 Counselor Flagged
              </button>
            </div>
          </div>
          
          {/* Posts count */}
          <div className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
            {posts.length} {posts.length === 1 ? 'post' : 'posts'}
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 rounded-lg bg-red-100 border border-red-300 text-red-700">
            <p>{error}</p>
            <button
              onClick={fetchPosts}
              className="mt-2 text-sm underline hover:no-underline"
            >
              Try again
            </button>
          </div>
        )}

        {/* Loading State */}
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
            <p className={isDarkMode ? "text-gray-300" : "text-gray-600"}>
              Loading posts...
            </p>
          </div>
        ) : (
          <>
            {/* Posts List */}
            {posts.length === 0 ? (
              <div className={`text-center py-12 rounded-lg ${
                isDarkMode ? "bg-gray-800" : "bg-white"
              }`}>
                <div className="text-6xl mb-4">📝</div>
                <h3 className={`text-xl font-semibold mb-2 ${
                  isDarkMode ? "text-white" : "text-gray-900"
                }`}>
                  No posts yet
                </h3>
                <p className={isDarkMode ? "text-gray-300" : "text-gray-600"}>
                  Be the first to share something with the community!
                </p>
              </div>
            ) : (
              <div className="space-y-6">
                {posts.map((post) => (
                  <PostCard
                    key={post._id}
                    post={post}
                    onHelpfulVote={handleHelpfulVote}
                    onReaction={handleReaction}
                    onComment={handleComment}
                    currentNickname={nickname}
                  />
                ))}
              </div>
            )}
          </>
        )}
      </div>

      {/* Floating Create Post Button */}
      <button
        onClick={() => setShowCreatePost(true)}
        className={`fixed bottom-6 left-6 w-14 h-14 rounded-full shadow-lg transition-all duration-300 transform hover:scale-110 z-50 ${
          isDarkMode
            ? "bg-perylene-600 hover:bg-perylene-600 text-white"
            : "bg-perylene-600 hover:bg-perylene-600 text-white"
        }`}
        title="Create New Post"
      >
        <span className="text-2xl">✏️</span>
      </button>

      {/* Create Post Modal */}
      {showCreatePost && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className={`w-full max-w-2xl rounded-lg shadow-xl transition-colors duration-300 ${
            isDarkMode ? "bg-gray-800" : "bg-white"
          }`}>
            <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
              <h2 className={`text-xl font-bold ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                Create New Post
              </h2>
              <button
                onClick={() => setShowCreatePost(false)}
                className={`p-2 rounded-lg transition-colors duration-200 ${
                  isDarkMode
                    ? "text-gray-400 hover:text-white hover:bg-gray-700"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                }`}
              >
                ✕
              </button>
            </div>
            <div className="p-4">
              <CreatePost 
                onCreatePost={handleCreatePost}
                currentNickname={nickname}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Posts;
