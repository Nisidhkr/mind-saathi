const express = require("express");
const Group = require("../models/Group");

const router = express.Router();

// GET all groups
router.get("/", async (req, res) => {
  try {
    const groups = await Group.find();
    res.json(groups);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
