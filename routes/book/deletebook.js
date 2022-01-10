var express = require('express');
var router = express.Router();

var db = require('./../../connection');

// requires a body with bookid properties

router.delete('/', function(req, res, next) {
  let sql = `DELETE FROM attendancebook 
    WHERE bookID = ${req.body.bookid}`;
  console.log(req.body.bookid)
  db.query(sql, (err, result) => {
    if (err) throw err;
  })
  res.send('Book deleted');
});

module.exports = router;