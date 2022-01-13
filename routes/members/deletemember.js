var express = require('express');
var router = express.Router();
var verifyJWT = require("./../../src/verifyJWT");

var db = require('../../src/connection');

// requires a body with memberid properties

router.delete('/', verifyJWT, function(req, res, next) {
  let sql = `DELETE FROM members WHERE memberID = ${req.body.memberid}`;
  console.log(req.body.bookid)
  db.query(sql, (err, result) => {
    if (err) return res.status(400).send(err);
  })
  return res.send('Member deleted');
});

module.exports = router;