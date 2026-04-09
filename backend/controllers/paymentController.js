const db = require('../db');

exports.getMyPayment = (req, res) => {
  const payments = db.prepare('SELECT * FROM payments WHERE user_id=?').all(req.user.id);
  res.json(payments);
};

exports.markPaid = (req, res) => {
  const { user_id, month } = req.body;
  const existing = db.prepare('SELECT * FROM payments WHERE user_id=? AND month=?').get(user_id, month);
  if (existing) {
    db.prepare("UPDATE payments SET status='paid', paid_at=CURRENT_TIMESTAMP WHERE user_id=? AND month=?")
      .run(user_id, month);
  } else {
    db.prepare("INSERT INTO payments (user_id, month, status, paid_at) VALUES (?, ?, 'paid', CURRENT_TIMESTAMP)")
      .run(user_id, month);
  }
  res.json({ message: 'Payment marked as paid ✅' });
};