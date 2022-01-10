var express = require('express');
var router = express.Router();

var db = require('../../connection');

// requires a body with loginid and bookname properties

router.post('/', function(req, res, next) {
  let sql = `INSERT INTO attendancebook (LoginID, bookName) 
    VALUES ('${req.body.loginid}', '${req.body.bookname}')`;
  db.query(sql, (err, result) => {
    if (err) throw err;
  })
  res.send('Attendance book created');
});

module.exports = router;