const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema(
  {
    studentId: {
      type: String,
      default: null, // agar anonymous booking ho
    },
    studentName: {
      type: String,
      default: "Anonymous",
    },
    studentEmail: {
      type: String,
      default: null,
    },
    anonymous: {
      type: Boolean,
      required: true,
      default: false,
    },
    counsellorId: {
      type: String,
      required: true,
    },
    slot: {
      type: mongoose.Schema.Types.Mixed, // Can be string or object
      required: true,
    },
    date: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Appointment", appointmentSchema);
