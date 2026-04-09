const router = require('express').Router();
const auth = require('../middleware/auth');
const db = require('../db');
const { getAllStudents, manualOverride, getReports, getPrediction, toggleFestival } = require('../controllers/adminController');

router.get('/students', auth, getAllStudents);
router.post('/override', auth, manualOverride);
router.get('/reports', auth, getReports);
router.get('/prediction', auth, getPrediction);
router.post('/festival', auth, toggleFestival);

router.get('/settings', auth, (req, res) => {
  const festival = db.prepare("SELECT value FROM settings WHERE key='festival_mode'").get();
  const name = db.prepare("SELECT value FROM settings WHERE key='festival_name'").get();
  res.json({ festival_mode: festival.value, festival_name: name.value });
});

module.exports = router;