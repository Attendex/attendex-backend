var express = require('express');
var router = express.Router();
var verifyJWT = require("./../../src/verifyJWT");

var db = require('../../src/connection');

// requires a body with bookid properties

router.delete('/', verifyJWT, function(req, res, next) {
  try {
    let sql = `DELETE FROM attendancebook 
      WHERE bookID = ${req.body.bookid}`;
    console.log(req.body.bookid)
    db.query(sql, (err, result) => {
      if (err) throw err;
    })
    res.send('Book deleted');
  } catch (err) {
    return res.status(400).send(err)
  }
});

module.exports = router;