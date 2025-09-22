const express = require("express");
const {
  getPosts,
  createPost,
  addComment,
  toggleHelpfulVote,
  toggleReaction,
  deletePost
} = require("../../controllers/chat/postController");

const router = express.Router();

// GET /api/chat/posts - Get all posts (with optional sorting)
router.get("/", getPosts);

// POST /api/chat/posts - Create a new post
router.post("/", createPost);

// POST /api/chat/posts/:postId/comments - Add comment to a post
router.post("/:postId/comments", addComment);

// POST /api/chat/posts/:postId/helpful - Toggle helpful vote
router.post("/:postId/helpful", toggleHelpfulVote);

// POST /api/chat/posts/:postId/reactions - Toggle reaction
router.post("/:postId/reactions", toggleReaction);

// DELETE /api/chat/posts/:postId - Delete a post (for moderation)
router.delete("/:postId", deletePost);

module.exports = router;
