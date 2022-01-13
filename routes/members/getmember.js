var express = require('express');
var router = express.Router();
var verifyJWT = require("./../../src/verifyJWT");

var db = require('../../src/connection');

// requires query string to have bookid

router.get('/', verifyJWT, function(req, res, next) {
  try {
    let sql = `SELECT memberName, memberID FROM members 
      WHERE bookID = ${req.query.bookid}
      ORDER BY memberName`;
    db.query(sql, (err, result) => {
      if (err) 
      res.send(result);
    })
  } catch (err) {
    return res.status(400).send(err);
  }
  
});

module.exports = router;