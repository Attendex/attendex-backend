var express = require("express");
var router = express.Router();

var db = require("./../../connection");

// requires a body with loginid and password properties

router.post("/", function (req, res, next) {
  let sql = `INSERT INTO authentication (LoginID, password) 
    VALUES ('${req.body.loginid}', '${req.body.password}')`;
  db.query(sql, (err, result) => {
    if (err) throw err;
  });
  res.send("Account created");
});

module.exports = router;
