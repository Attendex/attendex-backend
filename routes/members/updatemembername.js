var express = require("express");
var router = express.Router();
var verifyJWT = require("./../../src/verifyJWT");

var db = require("../../src/connection");

// requires a body with memberid, name and properties

router.put("/", verifyJWT, async function (req, res, next) {
  try {

    // check duplicate name
    let memberName = "";
    let sql = `SELECT memberName FROM members 
      WHERE memberID = ${req.body.memberid}`;
    await db
      .promise()
      .query(sql)
      .then((result) => {
        memberName = result[0][0].memberName;
      })
      .catch((err) => {
        throw err;
      });
    if (memberName) return res.status(409).send("Member Name already exists");

    // update member name
    sql = `UPDATE members SET memberName = '${req.body.name}'
      WHERE memberID = ${req.body.memberid}`;
    db.query(sql, (err, result) => {
      if (err) throw err;
    });
    return res.send("Member name updated");
  } catch (err) {
    return res.status(400).send(err);
  }
});

module.exports = router;
