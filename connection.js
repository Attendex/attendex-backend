const mysql = require('mysql2');
require('dotenv').config();

// create connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: process.env.DB_PASSWORD,
  database: "attendance-management-system",
});

db.connect((err) => {
  if (err) {
    throw err;
  } else {
    console.log("Mysql connected");
  }
});

module.exports = db;
