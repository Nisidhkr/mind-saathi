// models/dashboard/LoginHistory.js
const mongoose = require("mongoose");

const LoginHistorySchema = new mongoose.Schema({
  firebaseUid: { 
    type: String, 
    required: true,
    ref: 'DashboardUser'
  },
  email: { 
    type: String, 
    required: true 
  },
  name: { 
    type: String 
  },
  loginTime: { 
    type: Date, 
    default: Date.now 
  },
  loginMethod: { 
    type: String, 
    enum: ['email', 'google', 'session_restore'], 
    required: true 
  },
  ipAddress: { 
    type: String 
  },
  userAgent: { 
    type: String 
  },
  deviceInfo: {
    browser: String,
    os: String,
    device: String
  }
}, {
  timestamps: true // This will add createdAt and updatedAt automatically
});

// Index for better query performance
LoginHistorySchema.index({ firebaseUid: 1, loginTime: -1 });
LoginHistorySchema.index({ email: 1, loginTime: -1 });

module.exports = mongoose.model("DashboardLoginHistory", LoginHistorySchema);
