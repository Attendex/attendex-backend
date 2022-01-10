var express = require('express');
var router = express.Router();

var db = require('./../../connection');

// requires a body with sheetid properties

router.delete('/', function(req, res, next) {
  let sql = `DELETE FROM attendancesheet WHERE sheetID = ${req.body.sheetid}`;
  console.log(req.body.bookid)
  db.query(sql, (err, result) => {
    if (err) throw err;
  })
  res.send('Sheet deleted');
});

module.exports = router;