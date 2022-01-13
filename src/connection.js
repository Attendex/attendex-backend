const res = require('express/lib/response');
const mysql = require('mysql2');
const createTableScript = require('./createtablescript');
require('dotenv').config();

// create connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: process.env.DB_PASSWORD,
  multipleStatements: true
});

db.query(createTableScript, (err) => {
  if (err) console.log(err);
})

db.connect((err) => {
  if (err) {
    throw err;
  } else {
    console.log("Mysql connected");
  }
});

module.exports = db;
