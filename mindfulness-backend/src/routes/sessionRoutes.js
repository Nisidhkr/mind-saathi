const express = require('express');
const { saveSession, getSessions } = require('../controllers/sessionController');
const router = express.Router();

router.post('/', saveSession);
router.get('/', getSessions);

module.exports = router;
