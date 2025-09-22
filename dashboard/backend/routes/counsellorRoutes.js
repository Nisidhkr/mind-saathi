const express = require("express");
const Counsellor = require("../models/Counsellor");

const router = express.Router();

// ✅ Get all counsellors
router.get("/", async (req, res) => {
  try {
    const counsellors = await Counsellor.find();
    res.json(counsellors);
  } catch (error) {
    console.error("Error fetching counsellors:", error);
    res.status(500).json({ error: "Failed to fetch counsellors" });
  }
});

// ✅ Add new counsellor
router.post("/", async (req, res) => {
  try {
    const newCounsellor = new Counsellor(req.body);
    await newCounsellor.save();
    res.status(201).json(newCounsellor);
  } catch (error) {
    console.error("Error adding counsellor:", error);
    res.status(500).json({ error: "Failed to add counsellor" });
  }
});

// ✅ Add new slot (by email, 1 hour duration)
router.put("/slots", async (req, res) => {
  try {
    const { email, start } = req.body;

    if (!email || !start) {
      return res.status(400).json({ error: "Email and start time are required" });
    }

    // End time = start + 1 hour
    const startDate = new Date(start);
    const endDate = new Date(startDate.getTime() + 60 * 60 * 1000);

    const slot = {
      start: startDate.toLocaleString(),
      end: endDate.toLocaleString(),
    };

    const counsellor = await Counsellor.findOneAndUpdate(
      { email },
      { $push: { slots: slot } },
      { new: true }
    );

    if (!counsellor) {
      return res.status(404).json({ error: "Counsellor not found" });
    }

    res.json({ message: "✅ Slot added successfully", slot, counsellor });
  } catch (error) {
    console.error("Error updating slots:", error);
    res.status(500).json({ error: "Failed to update slots" });
  }
});

// ✅ Get counsellor by ID
router.get("/:id", async (req, res) => {
  try {
    const counsellor = await Counsellor.findById(req.params.id);
    if (!counsellor) {
      return res.status(404).json({ error: "Counsellor not found" });
    }
    res.json(counsellor);
  } catch (error) {
    console.error("Error fetching counsellor:", error);
    res.status(500).json({ error: "Failed to fetch counsellor" });
  }
});

module.exports = router;
