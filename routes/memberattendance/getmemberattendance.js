var express = require("express");
var router = express.Router();

var db = require("../../connection");

// requires query string to have sheetid=(actual sheetID)

router.get("/", function (req, res, next) {
  let sql = `SELECT members.memberName, members.memberID, memberattendance.attended 
    FROM members INNER JOIN memberattendance
    ON members.memberID = memberattendance.memberID 
    WHERE fk_sheetID = ${req.query.sheetid}`;
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

module.exports = router;
