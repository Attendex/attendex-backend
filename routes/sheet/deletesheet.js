var express = require('express');
var router = express.Router();

var db = require('./../../connection');

// requires a body with bookid and date properties
// also deletes memberattendance with corresponding sheetID

router.delete('/', function(req, res, next) {
  let sql = `DELETE FROM attendancesheet 
    WHERE bookID = ${req.body.bookid} AND date = ${req.body.date}`;
  db.query(sql, (err, result) => {
    if (err) throw err;
  })
  res.send('Sheet deleted');
});

module.exports = router;