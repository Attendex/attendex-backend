var express = require('express');
var router = express.Router();

var db = require('./../../connection');

// requires a body with bookid properties

router.delete('/', function(req, res, next) {
  let sql = `DELETE FROM members WHERE memberID = ${req.body.memberid}`;
  console.log(req.body.bookid)
  db.query(sql, (err, result) => {
    if (err) throw err;
  })
  res.send('Member deleted');
});

module.exports = router;