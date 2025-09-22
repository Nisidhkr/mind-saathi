// backend/routes/periodRoutes.js
const express = require("express");
const router = express.Router();
const {
  getPeriods,
  getPeriodsInRange,
  createPeriod,
  updatePeriod,
  deletePeriod,
  getPeriodStats
} = require("../controllers/periodController");

// GET /api/periods - Get all periods
router.get("/", getPeriods);

// GET /api/periods/range - Get periods in date range
router.get("/range", getPeriodsInRange);

// GET /api/periods/stats - Get period statistics and predictions
router.get("/stats", getPeriodStats);

// POST /api/periods - Create new period entry
router.post("/", createPeriod);

// PUT /api/periods/:id - Update period entry
router.put("/:id", updatePeriod);

// DELETE /api/periods/:id - Delete period entry
router.delete("/:id", deletePeriod);

module.exports = router;
