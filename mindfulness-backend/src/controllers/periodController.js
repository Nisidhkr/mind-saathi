// backend/controllers/periodController.js
const Period = require("../models/Period");

// Get all periods
const getPeriods = async (req, res) => {
  try {
    const periods = await Period.find().sort({ startDate: -1 });
    res.json(periods);
  } catch (error) {
    console.error("Error fetching periods:", error);
    res.status(500).json({ error: "Failed to fetch periods" });
  }
};

// Get periods for a specific date range
const getPeriodsInRange = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    
    const query = {};
    if (startDate && endDate) {
      query.startDate = {
        $gte: new Date(startDate),
        $lte: new Date(endDate)
      };
    }
    
    const periods = await Period.find(query).sort({ startDate: -1 });
    res.json(periods);
  } catch (error) {
    console.error("Error fetching periods in range:", error);
    res.status(500).json({ error: "Failed to fetch periods" });
  }
};

// Create a new period entry
const createPeriod = async (req, res) => {
  try {
    const { startDate, endDate, flow, symptoms, mood, notes, cycleLength } = req.body;

    // Validate required fields
    if (!startDate) {
      return res.status(400).json({ error: "Start date is required" });
    }

    const newPeriod = new Period({
      startDate: new Date(startDate),
      endDate: endDate ? new Date(endDate) : null,
      flow,
      symptoms: symptoms || [],
      mood,
      notes,
      cycleLength: cycleLength || 28
    });

    const savedPeriod = await newPeriod.save();
    res.status(201).json(savedPeriod);
  } catch (error) {
    console.error("Error creating period:", error);
    res.status(500).json({ error: "Failed to create period entry" });
  }
};

// Update a period entry
const updatePeriod = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    // Convert date strings to Date objects if present
    if (updates.startDate) {
      updates.startDate = new Date(updates.startDate);
    }
    if (updates.endDate) {
      updates.endDate = new Date(updates.endDate);
    }

    const updatedPeriod = await Period.findByIdAndUpdate(
      id,
      updates,
      { new: true, runValidators: true }
    );

    if (!updatedPeriod) {
      return res.status(404).json({ error: "Period entry not found" });
    }

    res.json(updatedPeriod);
  } catch (error) {
    console.error("Error updating period:", error);
    res.status(500).json({ error: "Failed to update period entry" });
  }
};

// Delete a period entry
const deletePeriod = async (req, res) => {
  try {
    const { id } = req.params;
    
    const deletedPeriod = await Period.findByIdAndDelete(id);
    
    if (!deletedPeriod) {
      return res.status(404).json({ error: "Period entry not found" });
    }

    res.json({ message: "Period entry deleted successfully" });
  } catch (error) {
    console.error("Error deleting period:", error);
    res.status(500).json({ error: "Failed to delete period entry" });
  }
};

// Get period statistics and predictions
const getPeriodStats = async (req, res) => {
  try {
    const periods = await Period.find().sort({ startDate: -1 }).limit(12);
    
    if (periods.length === 0) {
      return res.json({
        averageCycleLength: 28,
        averagePeriodLength: 5,
        nextPredictedDate: null,
        commonSymptoms: [],
        totalPeriods: 0
      });
    }

    // Calculate average cycle length
    let totalCycleLength = 0;
    let cycleCount = 0;
    
    for (let i = 0; i < periods.length - 1; i++) {
      const current = new Date(periods[i].startDate);
      const next = new Date(periods[i + 1].startDate);
      const cycleDays = Math.abs((current - next) / (1000 * 60 * 60 * 24));
      
      if (cycleDays > 15 && cycleDays < 45) { // Valid cycle range
        totalCycleLength += cycleDays;
        cycleCount++;
      }
    }
    
    const averageCycleLength = cycleCount > 0 ? Math.round(totalCycleLength / cycleCount) : 28;

    // Calculate average period length
    const periodsWithEndDate = periods.filter(p => p.endDate);
    let totalPeriodLength = 0;
    
    periodsWithEndDate.forEach(period => {
      const start = new Date(period.startDate);
      const end = new Date(period.endDate);
      const duration = Math.abs((end - start) / (1000 * 60 * 60 * 24)) + 1;
      totalPeriodLength += duration;
    });
    
    const averagePeriodLength = periodsWithEndDate.length > 0 
      ? Math.round(totalPeriodLength / periodsWithEndDate.length) 
      : 5;

    // Predict next period
    const lastPeriod = periods[0];
    const nextPredictedDate = new Date(lastPeriod.startDate);
    nextPredictedDate.setDate(nextPredictedDate.getDate() + averageCycleLength);

    // Get common symptoms
    const symptomCounts = {};
    periods.forEach(period => {
      period.symptoms.forEach(symptom => {
        symptomCounts[symptom] = (symptomCounts[symptom] || 0) + 1;
      });
    });
    
    const commonSymptoms = Object.entries(symptomCounts)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 5)
      .map(([symptom, count]) => ({ symptom, count }));

    res.json({
      averageCycleLength,
      averagePeriodLength,
      nextPredictedDate,
      commonSymptoms,
      totalPeriods: periods.length,
      lastPeriodDate: lastPeriod.startDate
    });
  } catch (error) {
    console.error("Error calculating period stats:", error);
    res.status(500).json({ error: "Failed to calculate period statistics" });
  }
};

module.exports = {
  getPeriods,
  getPeriodsInRange,
  createPeriod,
  updatePeriod,
  deletePeriod,
  getPeriodStats
};
