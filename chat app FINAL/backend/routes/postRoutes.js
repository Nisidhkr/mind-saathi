const express = require("express");
const {
  getPosts,
  createPost,
  addComment,
  toggleHelpfulVote,
  toggleReaction,
  deletePost
} = require("../controllers/postController");

const router = express.Router();

// GET /api/posts - Get all posts (with optional sorting)
router.get("/", getPosts);

// POST /api/posts - Create a new post
router.post("/", createPost);

// POST /api/posts/:postId/comments - Add comment to a post
router.post("/:postId/comments", addComment);

// POST /api/posts/:postId/helpful - Toggle helpful vote
router.post("/:postId/helpful", toggleHelpfulVote);

// POST /api/posts/:postId/reactions - Toggle reaction
router.post("/:postId/reactions", toggleReaction);

// DELETE /api/posts/:postId - Delete a post (for moderation)
router.delete("/:postId", deletePost);

module.exports = router;
