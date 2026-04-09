const router = require('express').Router();
const auth = require('../middleware/auth');
const { getAllStudents, manualOverride, getReports, getPrediction, toggleFestival } = require('../controllers/adminController');
router.get('/students', auth, getAllStudents);
router.post('/override', auth, manualOverride);
router.get('/reports', auth, getReports);
router.get('/prediction', auth, getPrediction);
router.post('/festival', auth, toggleFestival);
module.exports = router;