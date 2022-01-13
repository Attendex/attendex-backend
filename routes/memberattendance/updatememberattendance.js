var express = require('express');
var router = express.Router();
var verifyJWT = require("./../../src/verifyJWT");

var db = require('../../src/connection');

// requires a body with attended, memberid, sheetid properties

router.put('/', verifyJWT, async function(req, res, next) {

  try {
    sql = `UPDATE memberattendance SET attended = ${req.body.attended} 
      WHERE memberID = ${req.body.memberid} AND fk_sheetID = ${req.body.sheetid}`;
    db.query(sql, (err, result) => {
      if (err) throw err;
    })
    return res.send('Memberattendance updated');
  } catch (err) {
    return res.status(400).send(err)
  }
});

module.exports = router;