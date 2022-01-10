var express = require('express');
var router = express.Router();

var db = require('./../../connection');

// requires a body with loginid properties

router.delete('/', function(req, res, next) {
  let sql = `DELETE FROM authentication 
    WHERE loginID = '${req.body.loginid}'`;
  db.query(sql, (err, result) => {
    if (err) throw err;
  })
  res.send('Account deleted');
});

module.exports = router;