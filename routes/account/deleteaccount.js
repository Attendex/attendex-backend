var express = require("express");
var router = express.Router();
var verifyJWT = require("./../../src/verifyJWT");

var db = require("../../src/connection");

router.delete("/", verifyJWT, function (req, res, next) {
  try {
    let sql = `DELETE FROM authentication 
      WHERE userID = '${req.userid}'`;
    db.query(sql, (err, result) => {
      if (err) throw err;
    });
    res.send("Account deleted");
  } catch(err) {
    return res.status(400).send(err)
  }
});

module.exports = router;
