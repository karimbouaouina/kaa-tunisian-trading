const jwt = require('jsonwebtoken');
const auth = (req, res, next) => {
  const tokenWithBearer = req.header('Authorization');
  if (!tokenWithBearer) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }
  const token = tokenWithBearer.replace(/^Bearer\s+/, "");
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
};

module.exports = auth;
