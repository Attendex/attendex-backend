var express = require('express');
var router = express.Router();
var verifyJWT = require("./../../src/verifyJWT");

var db = require('../../src/connection');

// requires a body with bookid and name properties

router.post('/', verifyJWT, function(req, res, next) {
  let sql = `INSERT INTO members (bookID, memberName) 
    VALUES (${req.body.bookid}, '${req.body.name}')`;
  db.query(sql, (err, result) => {
    if (err) return res.status(400).send(err);
  })
  return res.send('Member added');
});

module.exports = router;