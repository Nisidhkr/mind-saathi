// backend/routes/mindfulness/periodRoutes.js
const express = require("express");
const router = express.Router();
const {
  getPeriods,
  getPeriodsInRange,
  createPeriod,
  updatePeriod,
  deletePeriod,
  getPeriodStats
} = require("../../controllers/mindfulness/periodController");

// GET /api/mindfulness/periods - Get all periods
router.get("/", getPeriods);

// GET /api/mindfulness/periods/range - Get periods in date range
router.get("/range", getPeriodsInRange);

// GET /api/mindfulness/periods/stats - Get period statistics and predictions
router.get("/stats", getPeriodStats);

// POST /api/mindfulness/periods - Create new period entry
router.post("/", createPeriod);

// PUT /api/mindfulness/periods/:id - Update period entry
router.put("/:id", updatePeriod);

// DELETE /api/mindfulness/periods/:id - Delete period entry
router.delete("/:id", deletePeriod);

module.exports = router;
