var express = require("express");
var router = express.Router();
var verifyJWT = require("./../../src/verifyJWT");

var db = require("../../src/connection");

// requires query string to have bookid and date

router.post("/", verifyJWT, async function (req, res, next) {
  let sql = `SELECT sheetID FROM attendancesheet 
    WHERE bookID = ${req.body.bookid} AND ${req.body.date}`;
  let sheetID;
  await db.promise().query(sql)
    .then((result => {
      if (result[0].length === 0) { // if there is no sheetID at this date
        sheetID = null;
      } else { // if there is a sheetID already present on this date
        sheetID = result[0][0].sheetID;
      }
    }))
    .catch(err => {
      return res.status(400).send(err);
    })

  // if sheet already exist, throw error
  if (sheetID) {
    res.status(400).send('Sheet Already Exists'); // 400 bad request
  
  // else if sheet does not exist, create sheet with all members inside
  } else {

    // create sheet in attendancesheet table
    let sql = `INSERT INTO attendancesheet (bookID, date) 
      VALUES (${req.body.bookid}, ${req.body.date})`;
    db.query(sql, (err, result) => {
      if (err) return res.status(400).send(err);
    });

    // get new sheetid
    sql = `SELECT sheetID FROM attendancesheet
      WHERE bookID = ${req.body.bookid} AND ${req.body.date}`;
    await db.promise().query(sql)
      .then((result => {sheetID = result[0][0].sheetID}))
      .catch(err => {return res.status(400).send(err)})

    // get list of members from members table
    let listOfMembers;
    sql = `SELECT memberID from members WHERE bookID = ${req.body.bookid}`;
    await db.promise().query(sql)
      .then(result => listOfMembers = result[0])
      .catch(err => {return res.status(400).send(err)});

    // insert all members from this book into memberattendance
    let memberInsertedSql = "";
    for (let member = 0; member < listOfMembers.length; member++) {
      memberInsertedSql += `(${listOfMembers[member].memberID}, ${sheetID}, 0)`;
      if (member < listOfMembers.length - 1) {
        memberInsertedSql += ", ";
      }
    }
    sql = `INSERT INTO memberattendance (memberID, fk_sheetID, attended) `;
    if (memberInsertedSql) sql += `VALUES ${memberInsertedSql}`;
    db.query(sql, (err, result) => {
      if (err) return res.status(400).send(err);
    });

    // get memberattendance
    sql = `SELECT members.memberName, members.memberID, memberattendance.attended 
      FROM members INNER JOIN memberattendance
      ON members.memberID = memberattendance.memberID 
      WHERE fk_sheetID = ${sheetID}`;
    db.query(sql, (err, result) => {
      if (err) return res.status(400).send(err);
      return res.send(result);
    })
  }
  
});

module.exports = router;
