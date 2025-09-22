// backend/models/Mood.js
const mongoose = require("mongoose");

const moodSchema = new mongoose.Schema({
  mood: { type: String, required: true },
  emotions: [{ type: String }],
  reasons: [{ type: String }],
  note: { type: String },
  // User identification fields
  email: { type: String, required: true },
  userId: { type: String }, // Firebase UID
  userName: { type: String },
}, { timestamps: true });

// Index for better query performance
moodSchema.index({ email: 1, createdAt: -1 });
moodSchema.index({ userId: 1, createdAt: -1 });

module.exports = mongoose.model("Mood", moodSchema);
