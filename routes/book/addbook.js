var express = require("express");
var router = express.Router();
var verifyJWT = require("./../../src/verifyJWT");

var db = require("../../src/connection");

// requires a body with bookname properties

router.post("/", verifyJWT, async function (req, res, next) {
  try {

    // check duplicate book name
    let bookName = "";
    let sql = `SELECT bookName FROM attendancebook 
      WHERE userID = '${req.userid}' AND bookName = '${req.body.bookname}'`;
    await db.promise().query(sql).then(result => {
      bookName = result[0];
      console.log(bookName)
    }).catch(err => { throw err });
    if (bookName.length == 1) return res.status(409).send("Book Name already exists");

    // insert into book
    sql = `INSERT INTO attendancebook (userID, bookName) 
      VALUES ('${req.userid}', '${req.body.bookname}')`;
      console.log(req.userid);
      console.log(req.body.bookname);
    db.query(sql, (err, result) => {
      if (err) throw err;
    });
    res.send("Attendance book created");
  } catch (err) {
    return res.status(400).send(err)
  }
});

module.exports = router;
