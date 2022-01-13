var express = require("express");
var router = express.Router();
var verifyJWT = require("./../../src/verifyJWT");

var db = require("../../src/connection");

// requires query string to have sheetid

router.get("/", verifyJWT, async function (req, res, next) {

  // check if table contains sheetID, if does not contain, sheet not found error

  if (req.query.sheetid) {
    let sql = `SELECT members.memberName, members.memberID, memberattendance.attended 
      FROM members INNER JOIN memberattendance
      ON members.memberID = memberattendance.memberID 
      WHERE fk_sheetID = ${req.query.sheetid}`;
    db.query(sql, (err, result) => {
      if (err) return res.status(400).send(err); 
      return res.send(result);
    });
  } 
  
});

module.exports = router;
