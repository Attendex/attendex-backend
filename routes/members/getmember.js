var express = require('express');
var router = express.Router();

var db = require('../../connection');

// requires query string to have bookid

router.get('/', function(req, res, next) {
  let sql = `SELECT memberName, memberID FROM members 
    WHERE bookID = ${req.query.bookid}`;
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.send(result);
  })
  
});

module.exports = router;