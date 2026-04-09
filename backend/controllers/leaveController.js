const db = require('../db');

exports.applyLeave = (req, res) => {
  const { from_date, to_date, reason } = req.body;
  db.prepare('INSERT INTO leaves (user_id, from_date, to_date, reason) VALUES (?, ?, ?, ?)')
    .run(req.user.id, from_date, to_date, reason);
  res.json({ message: 'Leave applied and auto-approved ✅' });
};

exports.getMyLeaves = (req, res) => {
  const leaves = db.prepare('SELECT * FROM leaves WHERE user_id=? ORDER BY created_at DESC').all(req.user.id);
  res.json(leaves);
};