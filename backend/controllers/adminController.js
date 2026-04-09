const db = require('../db');
const { predictMealCount } = require('../services/predictionService');

exports.getAllStudents = (req, res) => {
  const students = db.prepare("SELECT id, name, email, role, is_active, created_at FROM users WHERE role != 'admin'").all();
  res.json(students);
};

exports.manualOverride = (req, res) => {
  const { user_id, date, meal_type, status } = req.body;
  const existing = db.prepare('SELECT * FROM attendance WHERE user_id=? AND date=? AND meal_type=?').get(user_id, date, meal_type);
  if (existing) {
    db.prepare("UPDATE attendance SET status=? WHERE user_id=? AND date=? AND meal_type=?").run(status, user_id, date, meal_type);
  } else {
    db.prepare("INSERT INTO attendance (user_id, meal_type, date, status) VALUES (?, ?, ?, ?)").run(user_id, meal_type, date, status);
  }
  res.json({ message: 'Override applied ✅' });
};

exports.getReports = (req, res) => {
  const { from, to } = req.query;
  const records = db.prepare(`
    SELECT a.*, u.name FROM attendance a
    JOIN users u ON a.user_id = u.id
    WHERE a.date BETWEEN ? AND ?
    ORDER BY a.date DESC
  `).all(from, to);
  res.json(records);
};

exports.getPrediction = (req, res) => {
  const today = new Date().toISOString().split('T')[0];
  const dayOfWeek = new Date().getDay();
  const enrolledCount = db.prepare("SELECT COUNT(*) as count FROM users WHERE role='student' AND is_active=1").get().count;
  const leavesToday = db.prepare("SELECT COUNT(*) as count FROM leaves WHERE ? BETWEEN from_date AND to_date").get(today).count;
  const festivalMode = db.prepare("SELECT value FROM settings WHERE key='festival_mode'").get().value === 'true';
  const predicted = predictMealCount({ enrolledCount, leavesToday, dayOfWeek, isFestival: festivalMode });
  res.json({ enrolledCount, leavesToday, predicted, festivalMode });
};

exports.toggleFestival = (req, res) => {
  const { festival_mode, festival_name } = req.body;
  db.prepare("UPDATE settings SET value=? WHERE key='festival_mode'").run(String(festival_mode));
  db.prepare("UPDATE settings SET value=? WHERE key='festival_name'").run(festival_name || '');
  res.json({ message: `Festival mode ${festival_mode ? 'ON' : 'OFF'} ✅` });
};