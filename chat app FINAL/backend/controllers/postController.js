const Post = require("../models/Post");
const { validateContent } = require("../utils/keywordFilter");

// Get all posts with sorting
const getPosts = async (req, res) => {
  try {
    const { sortBy = "recent" } = req.query;
    
    let sortOptions = {};
    let filterOptions = {};
    
    if (sortBy === "popular") {
      sortOptions = { totalInteractions: -1, createdAt: -1 };
    } else if (sortBy === "counselor-flagged") {
      // Future enhancement: filter posts flagged by counselors
      // For now, return empty array as this feature is not implemented yet
      filterOptions = { counselorFlagged: true };
      sortOptions = { createdAt: -1 };
    } else {
      sortOptions = { createdAt: -1 };
    }

    const posts = await Post.find(filterOptions).sort(sortOptions);
    res.json(posts);
  } catch (error) {
    console.error("Error fetching posts:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Create a new post
const createPost = async (req, res) => {
  try {
    const { text, nickname, isAnonymous = false } = req.body;

    // Validate content using keyword filter
    const validation = validateContent(text);
    if (!validation.isValid) {
      return res.status(400).json({ 
        message: validation.reason,
        blocked: true 
      });
    }

    const post = new Post({
      text,
      nickname,
      isAnonymous
    });

    await post.save();
    res.status(201).json(post);
  } catch (error) {
    console.error("Error creating post:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Add a comment to a post
const addComment = async (req, res) => {
  try {
    const { postId } = req.params;
    const { text, nickname, isAnonymous = false } = req.body;

    // Validate content using keyword filter
    const validation = validateContent(text);
    if (!validation.isValid) {
      return res.status(400).json({ 
        message: validation.reason,
        blocked: true 
      });
    }

    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    const comment = {
      text,
      nickname,
      isAnonymous
    };

    post.comments.push(comment);
    await post.save();

    res.json(post);
  } catch (error) {
    console.error("Error adding comment:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Toggle helpful vote
const toggleHelpfulVote = async (req, res) => {
  try {
    const { postId } = req.params;
    const { nickname } = req.body;

    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    const userIndex = post.helpfulVotes.users.indexOf(nickname);
    
    if (userIndex > -1) {
      // User already voted, remove vote
      post.helpfulVotes.users.splice(userIndex, 1);
      post.helpfulVotes.count = Math.max(0, post.helpfulVotes.count - 1);
    } else {
      // User hasn't voted, add vote
      post.helpfulVotes.users.push(nickname);
      post.helpfulVotes.count += 1;
    }

    await post.save();
    res.json(post);
  } catch (error) {
    console.error("Error toggling helpful vote:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Add or update reaction
const toggleReaction = async (req, res) => {
  try {
    const { postId } = req.params;
    const { emoji, nickname } = req.body;

    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    // Find existing reaction for this emoji
    let reaction = post.reactions.find(r => r.emoji === emoji);
    
    if (!reaction) {
      // Create new reaction
      reaction = { emoji, count: 0, users: [] };
      post.reactions.push(reaction);
    }

    const userIndex = reaction.users.indexOf(nickname);
    
    if (userIndex > -1) {
      // User already reacted, remove reaction
      reaction.users.splice(userIndex, 1);
      reaction.count = Math.max(0, reaction.count - 1);
      
      // Remove reaction if count is 0
      if (reaction.count === 0) {
        post.reactions = post.reactions.filter(r => r.emoji !== emoji);
      }
    } else {
      // User hasn't reacted, add reaction
      reaction.users.push(nickname);
      reaction.count += 1;
    }

    await post.save();
    res.json(post);
  } catch (error) {
    console.error("Error toggling reaction:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Delete a post (optional - for moderation)
const deletePost = async (req, res) => {
  try {
    const { postId } = req.params;
    
    const post = await Post.findByIdAndDelete(postId);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    res.json({ message: "Post deleted successfully" });
  } catch (error) {
    console.error("Error deleting post:", error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  getPosts,
  createPost,
  addComment,
  toggleHelpfulVote,
  toggleReaction,
  deletePost
};
