const router = require('express').Router();
const auth = require('../middleware/auth');
const { getMyPayment, markPaid } = require('../controllers/paymentController');
router.get('/mine', auth, getMyPayment);
router.post('/markpaid', auth, markPaid);
module.exports = router;