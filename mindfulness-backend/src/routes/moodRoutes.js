// backend/routes/moodRoutes.js
// backend/src/routes/moodRoutes.js
const express = require("express");
const router = express.Router();
const Mood = require("../models/Mood");

// Save mood with user information
router.post("/", async (req, res) => {
  try {
    const { mood, emotions, reasons, note, email, userId, userName } = req.body;
    
    // Validate required fields
    if (!mood || !email) {
      return res.status(400).json({ error: "Mood and email are required" });
    }

    const moodData = {
      mood,
      emotions: emotions || [],
      reasons: reasons || [],
      note: note || "",
      email,
      userId: userId || null,
      userName: userName || ""
    };

    const savedMood = await Mood.create(moodData);
    res.json(savedMood);
  } catch (err) {
    console.error("Error saving mood:", err);
    res.status(500).json({ error: "Failed to save mood" });
  }
});

// Get all moods (for admin/aggregated view)
router.get("/", async (req, res) => {
  try {
    const moods = await Mood.find().sort({ createdAt: 1 });
    res.json(moods);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch moods" });
  }
});

// Get moods for a specific user by email
router.get("/user/:email", async (req, res) => {
  try {
    const { email } = req.params;
    const moods = await Mood.find({ email }).sort({ createdAt: 1 });
    res.json(moods);
  } catch (err) {
    console.error("Error fetching user moods:", err);
    res.status(500).json({ error: "Failed to fetch user moods" });
  }
});

// Get moods for a specific user by userId
router.get("/user-id/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const moods = await Mood.find({ userId }).sort({ createdAt: 1 });
    res.json(moods);
  } catch (err) {
    console.error("Error fetching user moods:", err);
    res.status(500).json({ error: "Failed to fetch user moods" });
  }
});

module.exports = router;
