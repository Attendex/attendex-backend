var express = require('express');
var router = express.Router();
var verifyJWT = require("./../../src/verifyJWT");

var db = require('../../src/connection');

// requires a body with bookid properties

router.delete('/', verifyJWT, function(req, res, next) {
  let sql = `DELETE FROM attendancebook 
    WHERE bookID = ${req.body.bookid}`;
  console.log(req.body.bookid)
  db.query(sql, (err, result) => {
    if (err) return res.status(400).send(err);
  })
  res.send('Book deleted');
});

module.exports = router;