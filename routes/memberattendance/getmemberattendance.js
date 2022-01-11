var express = require("express");
var router = express.Router();

var db = require("../../connection");

// requires query string to have bookid and date

router.get("/", async function (req, res, next) {
  let sql = `SELECT sheetID FROM attendancesheet 
    WHERE bookID = ${req.query.bookid} AND ${req.query.date}`;
  let sheetID;
  await db.promise().query(sql)
    .then((result => {
      if (result[0].length === 0) { // if there is no sheetID at this date
        sheetID = null;
      } else { // if there is a sheetID already present on this date
        sheetID = result[0][0].sheetID;
      }
    }))
    .catch(err => {throw err})

  // if sheet already exist, get
  if (sheetID) {
    sql = `SELECT members.memberName, members.memberID, memberattendance.attended 
      FROM members INNER JOIN memberattendance
      ON members.memberID = memberattendance.memberID 
      WHERE fk_sheetID = ${sheetID}`;
    db.query(sql, (err, result) => {
      if (err) throw err;
      res.send(result);
    });
  
  // else if sheet does not exist, throw error
  } else {
    res.status(404).send('Sheet Not Found'); // 404 bad request
  }
  
});

module.exports = router;
