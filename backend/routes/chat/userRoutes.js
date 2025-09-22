const express = require("express");
const { getOrCreateUserNickname } = require("../../utils/chat/userManager");
const User = require("../../models/chat/User");

const router = express.Router();

// Get or create permanent nickname for user
router.post("/nickname", async (req, res) => {
  try {
    const { email } = req.body;
    
    if (!email) {
      return res.status(400).json({ error: "Email is required" });
    }
    
    const nickname = await getOrCreateUserNickname(email);
    
    res.json({ 
      success: true, 
      nickname,
      email 
    });
    
  } catch (error) {
    console.error("Error in /nickname endpoint:", error);
    res.status(500).json({ 
      error: "Failed to get nickname",
      success: false 
    });
  }
});

// Get all users (for debugging/admin purposes)
router.get("/all", async (req, res) => {
  try {
    const users = await User.find({}, { email: 1, nickname: 1, createdAt: 1, lastActive: 1 }).sort({ createdAt: -1 });
    
    res.json({ 
      success: true, 
      count: users.length,
      users: users.map(user => ({
        email: user.email,
        nickname: user.nickname,
        createdAt: user.createdAt,
        lastActive: user.lastActive
      }))
    });
    
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ 
      error: "Failed to fetch users",
      success: false 
    });
  }
});

module.exports = router;
