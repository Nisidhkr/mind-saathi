const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Counsellor = require("../../models/dashboard/Counsellor");

const router = express.Router();

// ✅ Counsellor Login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    // Find counsellor by email
    const counsellor = await Counsellor.findOne({ email });
    if (!counsellor) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    // Check password
    const isPasswordValid = await bcrypt.compare(password, counsellor.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    // Generate JWT token
    const token = jwt.sign(
      { 
        id: counsellor._id, 
        email: counsellor.email, 
        name: counsellor.name,
        role: 'counsellor'
      },
      process.env.JWT_SECRET || 'supersecretkey123',
      { expiresIn: '24h' }
    );

    // Return success response
    res.json({
      message: "Login successful",
      token,
      counsellor: {
        id: counsellor._id,
        name: counsellor.name,
        email: counsellor.email,
        specialization: counsellor.specialization
      }
    });
  } catch (error) {
    console.error("Error during counsellor login:", error);
    res.status(500).json({ error: "Login failed. Please try again." });
  }
});

// ✅ Get all counsellors
router.get("/", async (req, res) => {
  try {
    const counsellors = await Counsellor.find().select('-password'); // Exclude password from response
    res.json(counsellors);
  } catch (error) {
    console.error("Error fetching counsellors:", error);
    res.status(500).json({ error: "Failed to fetch counsellors" });
  }
});

// ✅ Add new counsellor
router.post("/", async (req, res) => {
  try {
    const { name, email, password, specialization } = req.body;

    // Check if counsellor already exists
    const existingCounsellor = await Counsellor.findOne({ email });
    if (existingCounsellor) {
      return res.status(400).json({ error: "Counsellor with this email already exists" });
    }

    // Hash password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create new counsellor
    const newCounsellor = new Counsellor({
      name,
      email,
      password: hashedPassword,
      specialization,
      slots: [],
      bookings: []
    });

    await newCounsellor.save();
    
    // Return counsellor without password
    const { password: _, ...counsellorResponse } = newCounsellor.toObject();
    res.status(201).json(counsellorResponse);
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
