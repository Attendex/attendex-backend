var express = require('express');
var router = express.Router();
var verifyJWT = require("../../src/verifyJWT");

var db = require('../../src/connection');

// requires a body with bookid and bookname properties

router.put('/', verifyJWT, async function(req, res, next) {
  try {

    // check duplicate book name
    let bookName = "";
    let sql = `SELECT bookName FROM attendancebook 
      WHERE bookID = '${req.body.bookid}'`;
    await db.promise().query(sql).then(result => {
      bookName = result[0].bookName;
    }).catch(err => { throw err });
    if (!bookName) return res.status(409).send("Book Name already exists");

    // update book name
    sql = `UPDATE attendancebook SET bookName = '${req.body.bookname}'
      WHERE bookID = ${req.body.bookid}`;
    db.query(sql, (err, result) => {
      if (err) throw err;
    }) 
    return res.send('BookName updated');
  } catch (err) {
    return res.status(400).send(err);
  }
});

module.exports = router;