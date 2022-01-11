var express = require('express');
var router = express.Router();

var db = require('../../connection');

// requires a body with attended, memberid, bookid and date properties

router.put('/', async function(req, res, next) {

  let sheetID;

  // get new sheetid
  let sql = `SELECT sheetID FROM attendancesheet
    WHERE bookID = ${req.body.bookid} AND ${req.body.date}`;
  await db.promise().query(sql)
    .then((result => {sheetID = result[0][0].sheetID}))
    .catch(err => {throw err})

  sql = `UPDATE memberattendance SET attended = ${req.body.attended} 
    WHERE memberID = ${req.body.memberid} AND fk_sheetID = ${sheetID}`;
  db.query(sql, (err, result) => {
    if (err) throw err;
  })
  res.send('Memberattendance updated');
});

module.exports = router;