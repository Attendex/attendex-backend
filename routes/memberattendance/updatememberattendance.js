var express = require('express');
var router = express.Router();
var verifyJWT = require("./../../src/verifyJWT");

var db = require('../../src/connection');

// requires a body with attended, memberid, sheetid properties

router.put('/', verifyJWT, async function(req, res, next) {

  sql = `UPDATE memberattendance SET attended = ${req.body.attended} 
    WHERE memberID = ${req.body.memberid} AND fk_sheetID = ${req.body.sheetid}`;
  db.query(sql, (err, result) => {
    if (err) throw err;
  })
  res.send('Memberattendance updated');
});

module.exports = router;