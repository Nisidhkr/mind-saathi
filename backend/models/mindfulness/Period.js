// backend/models/mindfulness/Period.js
const mongoose = require("mongoose");

const periodSchema = new mongoose.Schema({
  startDate: { 
    type: Date, 
    required: true 
  },
  endDate: { 
    type: Date 
  },
  cycleLength: { 
    type: Number, 
    default: 28 
  },
  flow: { 
    type: String, 
    enum: ['light', 'medium', 'heavy'], 
    default: 'medium' 
  },
  symptoms: [{
    type: String,
    enum: [
      'cramps', 'headache', 'bloating', 'mood_swings', 
      'fatigue', 'back_pain', 'breast_tenderness', 
      'nausea', 'acne', 'food_cravings', 'irritability'
    ]
  }],
  mood: {
    type: String,
    enum: ['happy', 'sad', 'anxious', 'irritated', 'normal', 'energetic']
  },
  notes: { 
    type: String, 
    maxlength: 500 
  },
  isActive: { 
    type: Boolean, 
    default: true 
  }
}, { 
  timestamps: true 
});

// Index for efficient date queries
periodSchema.index({ startDate: -1 });
periodSchema.index({ createdAt: -1 });

// Virtual for cycle duration
periodSchema.virtual('duration').get(function() {
  if (this.endDate && this.startDate) {
    const diffTime = Math.abs(this.endDate - this.startDate);
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  }
  return null;
});

// Method to calculate next predicted period
periodSchema.methods.getNextPredictedDate = function() {
  const avgCycleLength = this.cycleLength || 28;
  const nextDate = new Date(this.startDate);
  nextDate.setDate(nextDate.getDate() + avgCycleLength);
  return nextDate;
};

module.exports = mongoose.model("MindfulnessPeriod", periodSchema);
