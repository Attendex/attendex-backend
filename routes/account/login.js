var express = require("express");
var jwt = require("jsonwebtoken");
require("dotenv").config();
var router = express.Router();

var db = require("../../src/connection");

// requires body to have userid and password

router.post("/", async function (req, res, next) {
  let sql = `SELECT password FROM authentication 
    WHERE userID = '${req.body.userid}'`;
  let password;

  await db
    .promise()
    .query(sql)
    .then((result) => {
      console.log(result);
      passwordObject = result[0];

      // userid does not exist
      if (passwordObject.length == 0) return res.sendStatus(403);
      password = passwordObject[0].password;
    })
    .catch((err) => {
      return res.status(400).send(err);
    });

  const userid = req.body.userid;

  // forbidden (wrong username or password)
  if (password !== req.body.password) return res.status(403).send("Wrong username or password");

  const user = { userid: userid };

  // add { expiresIn: '30m' } for expiration of token in 30 min
  const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '30m' }); 
  res.json({accessToken: accessToken});
});

module.exports = router;
