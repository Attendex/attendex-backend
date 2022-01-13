var express = require("express");
var router = express.Router();
var verifyJWT = require("./../../src/verifyJWT");

var db = require("../../src/connection");

// requires a body with bookname properties

router.post("/", verifyJWT, function (req, res, next) {
  let sql = `INSERT INTO attendancebook (userID, bookName) 
    VALUES ('${req.userid}', '${req.body.bookname}')`;
  db.query(sql, (err, result) => {
    if (err) return res.status(400).send(err);
  });
  res.send("Attendance book created");
});

module.exports = router;
