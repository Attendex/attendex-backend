var express = require("express");
var router = express.Router();
var verifyJWT = require("./../../src/verifyJWT");

var db = require("../../src/connection");

// requires query string to have userid=(actual login ID)

router.get("/", verifyJWT, function (req, res, next) {
  let sql = `SELECT bookName, bookID FROM attendancebook 
    WHERE userID = '${req.query.userid}'`;
  db.query(sql, (err, result) => {
    if (err) return res.status(400).send(err);
    return res.send(result);
  });
});

module.exports = router;
