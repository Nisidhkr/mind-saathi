const Session = require('../models/Session');

exports.saveSession = async (req, res) => {
  try {
    const session = await Session.create(req.body);
    res.json(session);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getSessions = async (req, res) => {
  try {
    const sessions = await Session.find().sort({ timestamp: 1 });
    res.json(sessions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
