const jwt = require('jsonwebtoken');

// authentication w/ jwt
const authMiddleware = (req, res, next) => {
  const authHeader = req.headers['authorization'];

  // if no auth header, returns 401
  if (!authHeader) {
    return res.status(401).json({ message: 'No token provided' });
  }

  // extracts token from auth header 
  const token = authHeader.split(' ')[1];
  jwt.verify(token, process.env.JWT_SECRET || 'secretkey', (err, decoded) => {

    // returns 403 if token is invalid
    if (err) {
      return res.status(403).json({ message: 'Failed to authenticate token' });
    }

    // sets req.userId to the decoded token's userId
    req.userId = decoded.userId;
    next();
  });
};

module.exports = authMiddleware;