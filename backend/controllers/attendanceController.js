const db = require('../db');

exports.checkIn = (req, res) => {
  const { meal_type } = req.body;
  const today = new Date().toISOString().split('T')[0];
  const already = db.prepare(
    'SELECT * FROM attendance WHERE user_id=? AND meal_type=? AND date=?'
  ).get(req.user.id, meal_type, today);
  if (already) return res.status(400).json({ error: 'Already checked in for this meal' });
  db.prepare('INSERT INTO attendance (user_id, meal_type, date) VALUES (?, ?, ?)')
    .run(req.user.id, meal_type, today);
  res.json({ message: `Checked in for ${meal_type} ✅` });
};

exports.getMyAttendance = (req, res) => {
  const records = db.prepare('SELECT * FROM attendance WHERE user_id=? ORDER BY date DESC').all(req.user.id);
  res.json(records);
};

exports.getTodayAll = (req, res) => {
  const today = new Date().toISOString().split('T')[0];
  const records = db.prepare(`
    SELECT a.*, u.name, u.email FROM attendance a
    JOIN users u ON a.user_id = u.id
    WHERE a.date = ?
  `).all(today);
  res.json(records);
};