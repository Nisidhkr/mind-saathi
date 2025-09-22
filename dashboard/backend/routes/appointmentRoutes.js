const express = require("express");
const Appointment = require("../models/Appointment");

const router = express.Router();

// ✅ Get upcoming appointments for a specific user
router.get("/my-upcoming/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    
    // Find appointments for this user that haven't ended yet
    const appointments = await Appointment.find({
      studentId: userId,
    });

    // Filter for upcoming/ongoing appointments
    const now = new Date();
    const upcoming = appointments.filter(appointment => {
      const slot = appointment.slot;
      if (typeof slot === "string" && slot.includes("→")) {
        const [, endStr] = slot.split("→");
        const endTime = new Date(endStr.trim());
        return endTime > now;
      }
      return true; // Include if we can't parse the time
    });

    res.json(upcoming);
  } catch (error) {
    console.error("Error fetching user appointments:", error);
    res.status(500).json({ error: "Failed to fetch appointments" });
  }
});

// ✅ Get appointments for a specific counsellor
router.get("/counsellor/:counsellorId", async (req, res) => {
  try {
    const { counsellorId } = req.params;
    const appointments = await Appointment.find({ counsellorId });
    res.json(appointments);
  } catch (error) {
    console.error("Error fetching counsellor appointments:", error);
    res.status(500).json({ error: "Failed to fetch appointments" });
  }
});

// ✅ Get all appointments
router.get("/", async (req, res) => {
  try {
    const appointments = await Appointment.find();
    res.json(appointments);
  } catch (error) {
    console.error("Error fetching appointments:", error);
    res.status(500).json({ error: "Failed to fetch appointments" });
  }
});

// ✅ Create new appointment
router.post("/", async (req, res) => {
  try {
    const appointment = new Appointment(req.body);
    await appointment.save();
    res.status(201).json(appointment);
  } catch (error) {
    console.error("Error creating appointment:", error);
    res.status(500).json({ error: "Failed to create appointment" });
  }
});

module.exports = router;
