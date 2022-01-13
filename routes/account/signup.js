var express = require("express");
var router = express.Router();
var jwt = require("jsonwebtoken");

var db = require("../../src/connection");

// requires a body with userid and password properties

router.post("/", function (req, res, next) {
  try {
    let sql = `INSERT INTO authentication (userID, password) 
      VALUES ('${req.body.userid}', '${req.body.password}')`;
    db.query(sql, (err, result) => {
      if (err) throw err;
    });
  
    const userid = req.body.userid;

    const user = { userid: userid };

    const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '30m' }); 
    return res.json({accessToken: accessToken});

  } catch (err) {
    return res.status(400).send(err);
  }
});

module.exports = router;
