const db = require('./db');
const bcrypt = require('bcryptjs');

const password = bcrypt.hashSync('admin123', 10);

try {
  db.prepare("INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)")
    .run('Admin User', 'admin@mess.com', password, 'admin');
  
  db.prepare("INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)")
    .run('Test Student', 'student@mess.com', bcrypt.hashSync('student123', 10), 'student');

  console.log('✅ Seed complete!');
  console.log('Admin: admin@mess.com / admin123');
  console.log('Student: student@mess.com / student123');
} catch(e) {
  console.log('Already seeded or error:', e.message);
}