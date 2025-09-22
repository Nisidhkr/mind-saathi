const express = require("express");
const Counsellor = require("../models/Counsellor");
const Appointment = require("../models/Appointment");
const User = require("../models/User");

const router = express.Router();

// ✅ Helper: format slot into human-readable string
function formatSlot(slot) {
  if (typeof slot === "string") return slot;

  if (slot && slot.start && slot.end) {
    const start = new Date(slot.start).toLocaleString();
    const end = new Date(slot.end).toLocaleString();
    return `${start} → ${end}`;
  }

  return "Invalid slot";
}

// ✅ Book a counsellor slot
router.post("/book", async (req, res) => {
  try {
    let { studentId, studentEmail, studentName, counsellorId, slot } = req.body;

    if (!counsellorId || !slot) {
      return res.status(400).json({ error: "Missing required fields: counsellorId and slot are required" });
    }

    // Resolve student identity from User model
    try {
      let userDoc = null;
      if (studentId) {
        userDoc = await User.findOne({ firebaseUid: studentId });
      }
      if (!userDoc && studentEmail) {
        userDoc = await User.findOne({ email: studentEmail });
      }
      if (userDoc) {
        if (!studentName) studentName = userDoc.name || userDoc.email || "User";
        if (!studentId) studentId = userDoc.firebaseUid;
        if (!studentEmail) studentEmail = userDoc.email;
      }
    } catch (_) {}

    if (!studentName) {
      studentName = "Anonymous";
    }

    // 1. Create appointment
    const slotLabel = formatSlot(slot);
    const newAppointment = new Appointment({
      studentId,
      studentName,
      studentEmail,
      counsellorId,
      slot: slotLabel,
      anonymous: !studentId,
    });
    await newAppointment.save();

    // 2. Update counsellor - remove slot and add booking
    const counsellor = await Counsellor.findByIdAndUpdate(
      counsellorId,
      {
        $pull: { slots: slot }, // remove booked slot
        $push: { 
          bookings: { 
            slot: slotLabel, 
            studentName, 
            studentId, 
            studentEmail,
            createdAt: new Date()
          } 
        },
      },
      { new: true }
    );

    if (!counsellor) {
      return res.status(404).json({ error: "Counsellor not found" });
    }

    res.status(201).json({
      message: "✅ Slot booked successfully",
      appointment: newAppointment,
      counsellor,
    });
  } catch (err) {
    console.error("❌ Error booking slot:", err);
    res.status(500).json({ error: "Failed to book slot" });
  }
});

// ✅ Get all appointments
router.get("/", async (req, res) => {
  try {
    const appointments = await Appointment.find();
    const formatted = appointments.map((a) => ({
      ...a._doc,
      slot: formatSlot(a.slot),
    }));
    res.json(formatted);
  } catch (error) {
    console.error("❌ Error fetching appointments:", error);
    res.status(500).json({ error: "Failed to fetch appointments" });
  }
});

module.exports = router;
