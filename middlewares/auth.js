const jwt = require('jsonwebtoken');

const { NODE_ENV, JWT_SECRET } = process.env;
const AuthorizationError = require('../errors/authorization-error');

const auth = (req, res, next) => {
  const token = req.cookies.jwt;
  let payload;
  try {
    if (token) {
      payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret');
    } else {
      throw new AuthorizationError('Необходима авторизация');
    }
  } catch (err) {
    return next(err);
  }
  req.user = payload;
  return next();
};

module.exports = auth;
