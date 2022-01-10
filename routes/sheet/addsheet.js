var express = require('express');
var router = express.Router();

var db = require('./../../connection');

// requires a body with bookid and date (string) properties

router.post('/', function(req, res, next) {
  let sql = `INSERT INTO attendancesheet (bookID, date) 
    VALUES (${req.body.bookid}, ${req.body.date})`;
  db.query(sql, (err, result) => {
    if (err) throw err;
  })
  res.send('Sheet added');
});

module.exports = router;