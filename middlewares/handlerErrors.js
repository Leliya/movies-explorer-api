const NotFoundError = require('../errors/not-found-error');
const {
  SERVER_ERROR,
  NOT_FOUND,
} = require('../utils/const');

const handlerErrors = (err, req, res, next) => {
  const { statusCode = 500, message } = err;
  res.status(statusCode).send({
    message: statusCode === 500
      ? SERVER_ERROR
      : message,
  });
  next();
};

const notFound = (req, res, next) => {
  next(new NotFoundError(NOT_FOUND));
};

module.exports = { handlerErrors, notFound };
