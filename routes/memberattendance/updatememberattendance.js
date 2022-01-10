var express = require('express');
var router = express.Router();

var db = require('../../connection');

// requires a body with attended, memberid and sheetid properties

router.put('/', function(req, res, next) {
  let sql = `UPDATE memberattendance SET attended = ${req.body.attended} 
    WHERE memberID = ${req.body.memberid} AND fk_sheetID = ${req.body.sheetid}`;
  db.query(sql, (err, result) => {
    if (err) throw err;
  })
  res.send('Memberattendance updated');
});

module.exports = router;