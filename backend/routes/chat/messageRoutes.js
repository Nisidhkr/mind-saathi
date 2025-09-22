const express = require("express");
const Message = require("../../models/chat/Message");

const router = express.Router();

// GET messages of a group
router.get("/:groupId", async (req, res) => {
  try {
    const messages = await Message.find({ groupId: req.params.groupId })
      .sort({ createdAt: 1 }); // oldest first
    res.json(messages);
  } catch (err) {
    res.status(500).json({ message: "Error fetching messages" });
  }
});

module.exports = router;
