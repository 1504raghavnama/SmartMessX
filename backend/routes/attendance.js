const router = require('express').Router();
const auth = require('../middleware/auth');
const { checkIn, getMyAttendance, getTodayAll } = require('../controllers/attendanceController');
router.post('/checkin', auth, checkIn);
router.get('/mine', auth, getMyAttendance);
router.get('/today', auth, getTodayAll);
module.exports = router;