const Mood = require('../models/Mood');

exports.saveMood = async (req, res) => {
  try {
    const mood = await Mood.create(req.body);
    res.json(mood);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getMoodHistory = async (req, res) => {
  try {
    const moods = await Mood.find().sort({ timestamp: 1 });
    res.json(moods);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
