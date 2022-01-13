var express = require('express');
var router = express.Router();
var verifyJWT = require("./../../src/verifyJWT");

var db = require('../../src/connection');

// requires a body with bookid and name properties

router.post('/', verifyJWT, async function(req, res, next) {

  try {
    // insert member and get new memberid
    let newMemberID;
    let sql = `INSERT INTO members (bookID, memberName) 
      VALUES (${req.body.bookid}, '${req.body.name}')`;
    await db.promise().query(sql)
      .then(result => {
        newMemberID = result[0].insertId; // get new memberID that was just inserted
      }).catch(err => { throw err })


    // get all sheetid that this bookid is associated with
    let listOfSheetID = [];
    sql = `SELECT sheetID FROM attendancesheet
      WHERE bookID = ${req.body.bookid}`;

    await db.promise().query(sql)
      .then((result) => {
        listOfSheetID = result[0];
      }).catch(err => { throw err })



    // create sql query for creating memberattendances
    let memberAttendanceInserted = "";
    for (let sheetID = 0; sheetID < listOfSheetID.length; sheetID++) {
      memberAttendanceInserted += `(${newMemberID}, ${listOfSheetID[sheetID].sheetID}, 0)`;
      if (sheetID < listOfSheetID.length - 1) memberAttendanceInserted += ", ";
    }

    // insert memberattendance only if there are sheets that requires adding
    if (memberAttendanceInserted) {
      sql = `INSERT INTO memberattendance (memberID, fk_sheetID, attended) `;
      sql += `VALUES ${memberAttendanceInserted}`;
      console.log(sql)
      await db.promise().query(sql).catch(err => { throw err });
    }

    return res.send('Member added');
  } catch (err) {
    res.status(400).send(err);
  }
});

module.exports = router;