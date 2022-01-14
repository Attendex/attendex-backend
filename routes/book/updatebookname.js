var express = require('express');
var router = express.Router();
var verifyJWT = require("../../src/verifyJWT");

var db = require('../../src/connection');

// requires a body with bookid and bookname properties

router.put('/', verifyJWT, function(req, res, next) {
  try {
    sql = `UPDATE attendancebook SET bookName = '${req.body.bookname}'
      WHERE bookID = ${req.body.bookid}`;
    db.query(sql, (err, result) => {
      if (err) throw err;
    }) 
    return res.send('BookName updated');
  } catch (err) {
    return res.status(400).send(err);
  }
});

module.exports = router;