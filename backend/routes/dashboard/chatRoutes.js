const express = require("express");
const Chat = require("../../models/dashboard/Chat");
const User = require("../../models/dashboard/User");
const Counsellor = require("../../models/dashboard/Counsellor");

const router = express.Router();

// ✅ Save chat message
router.post("/", async (req, res) => {
  try {
    const chatMessage = new Chat(req.body);
    await chatMessage.save();
    res.status(201).json(chatMessage);
  } catch (error) {
    console.error("Error saving chat message:", error);
    res.status(500).json({ error: "Failed to save message" });
  }
});

// ✅ Get chat messages between student and counsellor
router.get("/messages", async (req, res) => {
  try {
    const { studentId, counsellorId, limit = 100 } = req.query;
    
    const messages = await Chat.find({
      $or: [
        { studentId, counsellorId },
        { studentId: counsellorId, counsellorId: studentId }
      ]
    })
    .sort({ createdAt: 1 })
    .limit(parseInt(limit));

    res.json(messages);
  } catch (error) {
    console.error("Error fetching messages:", error);
    res.status(500).json({ error: "Failed to fetch messages" });
  }
});

// ✅ Get conversations for a user (student or counsellor)
router.get("/conversations", async (req, res) => {
  try {
    const { role, userId } = req.query;
    
    let conversations = [];
    
    if (role === "student") {
      // Get all conversations where this user is the student
      const messages = await Chat.find({
        studentId: userId
      }).sort({ createdAt: -1 });
      
      // Group by counsellor
      const conversationMap = new Map();
      messages.forEach(msg => {
        if (!conversationMap.has(msg.counsellorId)) {
          conversationMap.set(msg.counsellorId, {
            partnerId: msg.counsellorId,
            lastMessage: msg.message,
            lastUser: msg.user,
            lastAt: msg.createdAt
          });
        }
      });
      
      conversations = Array.from(conversationMap.values());
    } else if (role === "counsellor") {
      // Get all conversations where this user is the counsellor
      const messages = await Chat.find({
        counsellorId: userId
      }).sort({ createdAt: -1 });
      
      // Group by student
      const conversationMap = new Map();
      messages.forEach(msg => {
        const partnerId = msg.studentId || "ANON";
        if (!conversationMap.has(partnerId)) {
          conversationMap.set(partnerId, {
            partnerId: partnerId,
            lastMessage: msg.message,
            lastUser: msg.user,
            lastAt: msg.createdAt
          });
        }
      });
      
      conversations = Array.from(conversationMap.values());
    }
    
    res.json(conversations);
  } catch (error) {
    console.error("Error fetching conversations:", error);
    res.status(500).json({ error: "Failed to fetch conversations" });
  }
});

// ✅ Get all users (for counsellor to see potential chat partners)
router.get("/users", async (req, res) => {
  try {
    const users = await User.find({}, { firebaseUid: 1, email: 1, name: 1 });
    const formattedUsers = users.map(user => ({
      id: user.firebaseUid,
      _id: user._id,
      uid: user.firebaseUid,
      email: user.email,
      name: user.name
    }));
    res.json(formattedUsers);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "Failed to fetch users" });
  }
});

module.exports = router;
