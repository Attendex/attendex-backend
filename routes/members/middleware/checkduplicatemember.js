var db = require("../../../src/connection");

async function checkDuplicateMemberName(req, res, next) {
  try {
    let memberName = "";
    let sql = `SELECT memberName FROM members 
      WHERE bookID = ${req.body.bookid} AND memberName = '${req.body.name}'`;
    await db.promise().query(sql).then(result => {
      memberName = result[0].memberName;
    }).catch(err => { throw err });
    if (!memberName) res.status(409).send("Duplicate Member Name");
    next();

  } catch (err) {
    return res.status(400).send(err)
  }
};

module.exports = checkDuplicateMemberName;