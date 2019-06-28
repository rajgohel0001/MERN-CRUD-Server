const jwt = require('jsonwebtoken');
const secret = 'mysecretsshhh';

const withAuth = function(req, res, next) {
  const token = 
      req.body.token ||
      req.query.token ||
      req.headers['x-access-token'] ||
      req.cookies.token ||
      req.params.token;

  if (!token) {
    res.status(401).send('Unauthorized: No token provided');
  } else {
    jwt.verify(token, secret, function(err, decoded) {
      if (err) {
        res.status(401).send('Unauthorized: Invalid token');
      } else {
        req.user_name = decoded.user_name;
        next();
      }
    });
  }
}

module.exports = withAuth;