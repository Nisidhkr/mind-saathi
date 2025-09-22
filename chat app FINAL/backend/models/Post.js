const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema(
  {
    nickname: { type: String, required: true },
    text: { type: String, required: true },
    isAnonymous: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const reactionSchema = new mongoose.Schema({
  emoji: { type: String, required: true },
  count: { type: Number, default: 0 },
  users: [{ type: String }] // Store nicknames to prevent duplicate reactions
});

const postSchema = new mongoose.Schema(
  {
    nickname: { type: String, required: true },
    text: { type: String, required: true },
    isAnonymous: { type: Boolean, default: false },
    helpfulVotes: {
      count: { type: Number, default: 0 },
      users: [{ type: String }] // Store nicknames to prevent duplicate votes
    },
    reactions: [reactionSchema],
    comments: [commentSchema],
    // For sorting purposes
    totalInteractions: { type: Number, default: 0 } // helpfulVotes + comments + reactions
  },
  { timestamps: true }
);

// Update totalInteractions before saving
postSchema.pre('save', function(next) {
  const totalReactions = this.reactions.reduce((sum, reaction) => sum + reaction.count, 0);
  this.totalInteractions = this.helpfulVotes.count + this.comments.length + totalReactions;
  next();
});

module.exports = mongoose.model("Post", postSchema);
