const mongoose = require('mongoose');

const sessionSchema = new mongoose.Schema({
  type: String,
  duration: Number,
  timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Session', sessionSchema);
