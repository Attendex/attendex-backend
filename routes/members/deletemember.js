var express = require('express');
var router = express.Router();
var verifyJWT = require("./../../src/verifyJWT");

var db = require('../../src/connection');

// requires a body with memberid properties

router.delete('/', verifyJWT, function(req, res, next) {
  try {
    let sql = `DELETE FROM members WHERE memberID = ${req.body.memberid}`;
    db.query(sql, err => {
      if (err) throw err;
    })
    return res.send('Member deleted');
  } catch (err) {
    return res.status(400).send(err)
  }
});

module.exports = router;