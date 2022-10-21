const jwt = require('jsonwebtoken');
const { NOT_AUTHORIZATION } = require('../utils/const');

const { NODE_ENV, JWT_SECRET } = process.env;
const AuthorizationError = require('../errors/authorization-error');

const auth = (req, res, next) => {
  const token = req.cookies.jwt;
  let payload;
  try {
    if (token) {
      payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret');
    } else {
      throw new AuthorizationError(NOT_AUTHORIZATION);
    }
  } catch (err) {
    return next(new AuthorizationError(NOT_AUTHORIZATION));
  }
  req.user = payload;
  return next();
};

module.exports = auth;
