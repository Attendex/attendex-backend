var express = require("express");
var router = express.Router();
var verifyJWT = require("./../../src/verifyJWT");

var db = require("../../src/connection");

// requires a body with userid properties

router.delete("/", verifyJWT, function (req, res, next) {
  let sql = `DELETE FROM authentication 
    WHERE userID = '${req.body.userid}'`;
  db.query(sql, (err, result) => {
    if (err) throw err;
  });
  res.send("Account deleted");
});

module.exports = router;
