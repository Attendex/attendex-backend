var express = require("express");
var router = express.Router();
var verifyJWT = require("./../../src/verifyJWT");

var db = require("../../src/connection");

// requires query string to have sheetid

router.get("/", verifyJWT, async function (req, res, next) {

  // if sheet already exist, get
  if (req.query.sheetid) {
    let sql = `SELECT members.memberName, members.memberID, memberattendance.attended 
      FROM members INNER JOIN memberattendance
      ON members.memberID = memberattendance.memberID 
      WHERE fk_sheetID = ${req.query.sheetid}`;
    db.query(sql, (err, result) => {
      if (err) throw err; 
      if (result.length === 0) res.status(404).send('Sheet Not Found'); // 404 not found
      res.send(result);
    });
  } 
  
});

module.exports = router;
