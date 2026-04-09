const router = require('express').Router();
const auth = require('../middleware/auth');
const { checkIn, getMyAttendance, getTodayAll } = require('../controllers/attendanceController');
router.post('/checkin', auth, checkIn);
router.get('/mine', auth, getMyAttendance);
router.get('/history', auth, getMyAttendance);  // ← ADD THIS
router.get('/today', auth, getTodayAll);
router.get('/history', auth, getMyAttendance);
module.exports = router;