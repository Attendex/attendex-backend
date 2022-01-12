var express = require('express');
var router = express.Router();
var verifyJWT = require("./../../src/verifyJWT");

var db = require('../../src/connection');

// requires a body with sheetID properties

router.delete('/', verifyJWT, function(req, res, next) {
  let sql = `DELETE FROM attendancesheet 
    WHERE sheetID = ${req.body.sheetid}`;
  db.query(sql, (err, result) => {
    if (err) throw err;
  })
  res.send('Sheet deleted');
});

module.exports = router;