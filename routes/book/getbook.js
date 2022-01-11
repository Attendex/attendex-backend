var express = require('express');
var router = express.Router();

var db = require('./../../connection');

// requires query string to have loginid=(actual login ID)

router.get('/', function(req, res, next) {
  let sql = `SELECT bookName, bookID FROM attendancebook 
    WHERE loginID = '${req.query.loginid}'`;
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.send(result);
  })
  
});

module.exports = router;