const mongoose = require("mongoose");

const counsellorSchema = new mongoose.Schema({
  name: String,
  email: String,
  specialization: String,

  // 🔹 Slot with start and end time (instead of plain string)
  slots: [
    {
      start: { type: String, required: true }, // example: "9/19/2025, 9:00:00 AM"
      end: { type: String, required: true },   // example: "9/19/2025, 10:00:00 AM"
    },
  ],

  // 🔹 Bookings linked to slots
  bookings: [
    {
      // allow either formatted string label ("start → end") or {start,end}
      slot: { type: mongoose.Schema.Types.Mixed, required: true },
      studentName: String,
      studentId: String,
      studentEmail: String,
      createdAt: { type: Date, default: Date.now },
    },
  ],
});

module.exports = mongoose.model("Counsellor", counsellorSchema, "counsellors");
