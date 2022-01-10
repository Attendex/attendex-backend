var express = require('express');
var router = express.Router();

var db = require('./../../connection');

// requires query string to have loginid=(actual login ID)

router.get('/', function(req, res, next) {
  let sql = `SELECT password FROM authentication WHERE LoginID = '${req.query.loginid}'`;
  db.query(sql, (err, data) => {
    if (err) throw err;
    console.log(data);
    res.send(data);
  })
  
});

module.exports = router;