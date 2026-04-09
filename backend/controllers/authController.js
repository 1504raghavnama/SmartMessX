const db = require('../db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = (req, res) => {
  const { name, email, password, role } = req.body;
  const hashed = bcrypt.hashSync(password, 10);
  try {
    const stmt = db.prepare('INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)');
    const result = stmt.run(name, email, hashed, role || 'student');
    res.json({ message: 'Registered successfully', userId: result.lastInsertRowid });
  } catch (e) {
    res.status(400).json({ error: 'Email already exists' });
  }
};

exports.login = (req, res) => {
  const { email, password } = req.body;
  const user = db.prepare('SELECT * FROM users WHERE email = ?').get(email);
  if (!user || !bcrypt.compareSync(password, user.password))
    return res.status(401).json({ error: 'Invalid credentials' });
  const token = jwt.sign(
    { id: user.id, role: user.role, name: user.name },
    process.env.JWT_SECRET,
    { expiresIn: '24h' }
  );
  res.json({ token, user: { id: user.id, name: user.name, role: user.role } });
};