const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.join(__dirname, 'data', 'paintshop.db');
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) return console.error('DB Connect Error:', err.message);
  console.log('Connected to SQLite database.');
});

module.exports = db;
