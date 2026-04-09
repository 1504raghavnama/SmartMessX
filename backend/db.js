const Database = require('better-sqlite3');
const path = require('path');

const db = new Database(path.join(__dirname, 'mess.db'));

db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    role TEXT DEFAULT 'student',
    is_active INTEGER DEFAULT 1,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS attendance (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER REFERENCES users(id),
    meal_type TEXT,
    date TEXT,
    status TEXT DEFAULT 'present',
    checked_in_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS leaves (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER REFERENCES users(id),
    from_date TEXT,
    to_date TEXT,
    reason TEXT,
    status TEXT DEFAULT 'approved',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS payments (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER REFERENCES users(id),
    month TEXT,
    amount REAL DEFAULT 3000,
    status TEXT DEFAULT 'unpaid',
    paid_at DATETIME
  );

  CREATE TABLE IF NOT EXISTS meals (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    date TEXT,
    meal_type TEXT,
    menu TEXT,
    is_festival INTEGER DEFAULT 0,
    predicted_count INTEGER DEFAULT 0
  );

  CREATE TABLE IF NOT EXISTS settings (
    key TEXT PRIMARY KEY,
    value TEXT
  );
`);

// Insert default settings if not exists
const existing = db.prepare("SELECT * FROM settings WHERE key='festival_mode'").get();
if (!existing) {
  db.prepare("INSERT INTO settings VALUES ('festival_mode', 'false')").run();
  db.prepare("INSERT INTO settings VALUES ('festival_name', '')").run();
}

module.exports = db;