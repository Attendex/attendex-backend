var express = require('express');
var router = express.Router();

var db = require('./../../connection');

// requires a body with bookid and name properties

router.post('/', function(req, res, next) {
  let sql = `INSERT INTO members (bookID, memberName) 
    VALUES (${req.body.bookid}, '${req.body.name}')`;
  db.query(sql, (err, result) => {
    if (err) throw err;
  })
  res.send('Member added');
});

module.exports = router;