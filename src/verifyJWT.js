var jwt = require("jsonwebtoken");
// requires authorization property in header

function verifyJWT(req, res, next) {

  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];
  if (token == null) return res.status(401).send("No token sent");

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    // unauthorised if token is not verified / expired
    if (err) return res.status(401).send("Token expired or unverified");  
    req.userid = user.userid;
    next();
  })
}

module.exports = verifyJWT;