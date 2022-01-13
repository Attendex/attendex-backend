var express = require("express");
var router = express.Router();
var verifyJWT = require("./../../src/verifyJWT");

var db = require("../../src/connection");

// requires a body with bookname properties

router.post("/", verifyJWT, function (req, res, next) {
  try {
    let sql = `INSERT INTO attendancebook (userID, bookName) 
      VALUES ('${req.userid}', '${req.body.bookname}')`;
    db.query(sql, (err, result) => {
      if (err) throw err;
    });
    res.send("Attendance book created");
  } catch (err) {
    return res.status(400).send(err)
  }
});

module.exports = router;
