const router = require('express').Router();
const auth = require('../middleware/auth');
const { applyLeave, getMyLeaves } = require('../controllers/leaveController');
router.post('/apply', auth, applyLeave);
router.get('/mine', auth, getMyLeaves);
module.exports = router;