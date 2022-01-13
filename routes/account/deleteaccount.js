var express = require("express");
var router = express.Router();
var verifyJWT = require("./../../src/verifyJWT");

var db = require("../../src/connection");

router.delete("/", verifyJWT, function (req, res, next) {
  let sql = `DELETE FROM authentication 
    WHERE userID = '${req.userid}'`;
  db.query(sql, (err, result) => {
    if (err) return res.status(400).send(err);
  });
  res.send("Account deleted");
});

module.exports = router;
