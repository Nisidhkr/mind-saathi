const express = require("express");
const router = express.Router();
const User = require("../models/User");

// Register new user (Firebase UID + extra data)
router.post("/register", async (req, res) => {
  try {
    const { firebaseUid, name, email } = req.body;

    let user = await User.findOne({ firebaseUid });
    if (!user) {
      user = new User({ firebaseUid, name, email });
      await user.save();
    }

    res.status(201).json({ message: "User saved to MongoDB", user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error saving user" });
  }
});

module.exports = router;
