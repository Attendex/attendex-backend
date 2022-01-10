var express = require("express");
var router = express.Router();

var db = require("../../connection");

// requires a body with memberid, sheetid and attended properties

router.post("/", function (req, res, next) {
  let sql = `INSERT INTO memberattendance (memberID, fk_sheetID, attended) 
    VALUES (${req.body.memberid}, ${req.body.sheetid}, ${req.body.attended})`;
  db.query(sql, (err, result) => {
    if (err) throw err;
  });
  res.send("Memberattendance created");
});

module.exports = router;
