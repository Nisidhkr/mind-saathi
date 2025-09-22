const mongoose = require("mongoose");

const ChatSchema = new mongoose.Schema(
  {
    user: { type: String, default: "Anonymous" },
    message: { type: String, default: "" },
    role: { type: String, enum: ["student", "counsellor", ""], default: "" },
    counsellorId: { type: String, default: "" },
    studentId: { type: String, default: "" },
    clientId: { type: String, default: "" },
    messageId: { type: String, default: "" },
    roomId: { type: String, default: "" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("DashboardChat", ChatSchema);
