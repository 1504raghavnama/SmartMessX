const router = require('express').Router();
const auth = require('../middleware/auth');
const { applyLeave, getMyLeaves } = require('../controllers/leaveController');
router.post('/apply', auth, applyLeave);
router.get('/mine', auth, getMyLeaves);
router.get('/my', auth, getMyLeaves);   // ← ADD THIS LINE
module.exports = router;