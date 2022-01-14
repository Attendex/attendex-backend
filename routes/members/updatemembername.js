var express = require('express');
var router = express.Router();
var verifyJWT = require("./../../src/verifyJWT");

var db = require('../../src/connection');

// requires a body with bookid and bookname properties

router.put('/', verifyJWT, function(req, res, next) {

  try {
    sql = `UPDATE members SET memberName = '${req.body.membername}'
      WHERE memberID = ${req.body.memberid}`;
    db.query(sql, (err, result) => {
      if (err) throw err;
    }) 
    return res.send('Member name updated');
  } catch (err) {
    return res.status(400).send(err);
  }
});

module.exports = router;