import React, { useState } from "react";
import { useTheme } from "../context/ThemeContext";

const PostCard = ({ post, onHelpfulVote, onReaction, onComment, currentNickname }) => {
  const { isDarkMode } = useTheme();
  const [showComments, setShowComments] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [isAnonymousComment, setIsAnonymousComment] = useState(false);
  const [isSubmittingComment, setIsSubmittingComment] = useState(false);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.trim() || isSubmittingComment) return;

    setIsSubmittingComment(true);
    try {
      await onComment(post._id, {
        text: newComment.trim(),
        nickname: currentNickname,
        isAnonymous: isAnonymousComment
      });
      setNewComment("");
      setIsAnonymousComment(false);
    } catch (error) {
      console.error("Error submitting comment:", error);
    } finally {
      setIsSubmittingComment(false);
    }
  };

  const handleReactionClick = (emoji) => {
    onReaction(post._id, { emoji, nickname: currentNickname });
  };

  const handleHelpfulClick = () => {
    onHelpfulVote(post._id, { nickname: currentNickname });
  };

  const isHelpfulVoted = post.helpfulVotes.users.includes(currentNickname);
  const availableReactions = ["👍", "❤️", "😂", "😮", "😢", "😡"];

  const getDisplayName = (nickname, isAnonymous) => {
    return isAnonymous ? "Anonymous" : nickname;
  };

  const getAvatarIcon = (isAnonymous) => {
    return isAnonymous ? "🎭" : "👤";
  };

  return (
    <div className={`rounded-lg shadow-md p-6 mb-4 transition-all duration-300 hover:shadow-lg ${
      isDarkMode ? "bg-gray-800 border border-gray-700" : "bg-white border border-gray-200"
    }`}>
      {/* Post Header */}
      <div className="flex items-center mb-4">
        <div className={`w-10 h-10 rounded-full flex items-center justify-center text-lg mr-3 ${
          isDarkMode ? "bg-gray-700" : "bg-gray-100"
        }`}>
          {getAvatarIcon(post.isAnonymous)}
        </div>
        <div>
          <p className={`font-semibold ${isDarkMode ? "text-white" : "text-gray-900"}`}>
            {getDisplayName(post.nickname, post.isAnonymous)}
          </p>
          <p className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
            {new Date(post.createdAt).toLocaleDateString()} at {new Date(post.createdAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
          </p>
        </div>
      </div>

      {/* Post Content */}
      <div className={`mb-4 ${isDarkMode ? "text-gray-200" : "text-gray-800"}`}>
        <p className="whitespace-pre-wrap">{post.text}</p>
      </div>

      {/* Interaction Buttons */}
      <div className="flex items-center gap-4 mb-4 flex-wrap">
        {/* Helpful Button */}
        <button
          onClick={handleHelpfulClick}
          className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-200 ${
            isHelpfulVoted
              ? isDarkMode 
                ? "bg-green-600 text-white" 
                : "bg-green-500 text-white"
              : isDarkMode
                ? "bg-gray-700 text-gray-300 hover:bg-gray-600"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          <span>👍</span>
          <span className="text-sm font-medium">
            Helpful ({post.helpfulVotes.count})
          </span>
        </button>

        {/* Reaction Buttons */}
        <div className="flex items-center gap-1">
          {availableReactions.map((emoji) => {
            const reaction = post.reactions.find(r => r.emoji === emoji);
            const userReacted = reaction?.users.includes(currentNickname);
            
            return (
              <button
                key={emoji}
                onClick={() => handleReactionClick(emoji)}
                className={`px-2 py-1 rounded-lg text-lg transition-all duration-200 ${
                  userReacted
                    ? isDarkMode 
                      ? "bg-blue-600 text-white" 
                      : "bg-blue-500 text-white"
                    : isDarkMode
                      ? "bg-gray-700 hover:bg-gray-600"
                      : "bg-gray-100 hover:bg-gray-200"
                }`}
                title={`${emoji} ${reaction?.count || 0}`}
              >
                {emoji}
                {reaction && reaction.count > 0 && (
                  <span className="ml-1 text-xs">{reaction.count}</span>
                )}
              </button>
            );
          })}
        </div>

        {/* Comments Toggle */}
        <button
          onClick={() => setShowComments(!showComments)}
          className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-200 ${
            isDarkMode
              ? "bg-gray-700 text-gray-300 hover:bg-gray-600"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          <span>💬</span>
          <span className="text-sm font-medium">
            Comments ({post.comments.length})
          </span>
        </button>
      </div>

      {/* Comments Section */}
      {showComments && (
        <div className={`border-t pt-4 ${isDarkMode ? "border-gray-700" : "border-gray-200"}`}>
          {/* Comment Form */}
          <form onSubmit={handleCommentSubmit} className="mb-4">
            <div className="flex gap-2 mb-2">
              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Write a comment..."
                className={`flex-1 p-3 rounded-lg border resize-none transition-colors duration-300 ${
                  isDarkMode
                    ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500"
                    : "bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-blue-500"
                } focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
                rows="2"
              />
            </div>
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={isAnonymousComment}
                  onChange={(e) => setIsAnonymousComment(e.target.checked)}
                  className="rounded"
                />
                <span className={`text-sm ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>
                  Comment anonymously
                </span>
              </label>
              <button
                type="submit"
                disabled={!newComment.trim() || isSubmittingComment}
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                  !newComment.trim() || isSubmittingComment
                    ? isDarkMode
                      ? "bg-gray-700 text-gray-500 cursor-not-allowed"
                      : "bg-gray-200 text-gray-400 cursor-not-allowed"
                    : isDarkMode
                      ? "bg-blue-600 text-white hover:bg-blue-700"
                      : "bg-blue-500 text-white hover:bg-blue-600"
                }`}
              >
                {isSubmittingComment ? "Posting..." : "Comment"}
              </button>
            </div>
          </form>

          {/* Comments List */}
          <div className="space-y-3">
            {post.comments.map((comment, index) => (
              <div key={index} className={`p-3 rounded-lg ${
                isDarkMode ? "bg-gray-700" : "bg-gray-50"
              }`}>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-sm">
                    {getAvatarIcon(comment.isAnonymous)}
                  </span>
                  <span className={`font-medium text-sm ${
                    isDarkMode ? "text-white" : "text-gray-900"
                  }`}>
                    {getDisplayName(comment.nickname, comment.isAnonymous)}
                  </span>
                  <span className={`text-xs ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
                    {new Date(comment.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <p className={`text-sm whitespace-pre-wrap ${
                  isDarkMode ? "text-gray-200" : "text-gray-700"
                }`}>
                  {comment.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default PostCard;
