const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { NODE_ENV, JWT_SECRET } = process.env;
const CastError = require('../errors/cast-error');
const DoubleEmailError = require('../errors/doubling-error');
const NotFoundError = require('../errors/not-found-error');
const User = require('../models/user');
const {
  INCORRECT_DATA,
  DOUBLE_EMAIL,
  USER_NOT_FOUND,
  SIGNOUT,
} = require('../utils/const');

const createUser = (req, res, next) => {
  const { name, email, password } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => {
      User.create({ name, email, password: hash })
        .then((user) => {
          const userConfidential = user.toObject({ useProjection: true });
          res.send(userConfidential);
        }).catch((err) => {
          if (err.name === 'ValidationError') {
            return next(new CastError(INCORRECT_DATA));
          }
          if (err.code === 11000) {
            return next(new DoubleEmailError(DOUBLE_EMAIL));
          }
          return next(err);
        });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new CastError(INCORRECT_DATA));
      }
      return next(err);
    });
};

const getCurrentUser = (req, res, next) => {
  User.findById(req.user._id)
    .orFail(() => { throw new NotFoundError(USER_NOT_FOUND); })
    .then((user) => res.send(user))
    .catch(next);
};

const updateUserInfo = (req, res, next) => {
  const { name, email } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { name, email },
    { new: true, runValidators: true },
  ).orFail(() => { throw new NotFoundError(USER_NOT_FOUND); })
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.code === 11000) {
        return next(new DoubleEmailError(DOUBLE_EMAIL));
      }
      if (err.name === 'ValidationError') {
        return next(new CastError(INCORRECT_DATA));
      }
      return next(err);
    });
};

const login = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret', { expiresIn: '7d' });
      return res
        .cookie('jwt', token, {
          maxAge: 3600000 * 24 * 7,
          httpOnly: true,
          sameSite: 'Lax',
        })
        .send({ email, password });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new CastError(INCORRECT_DATA));
      }
      return next(err);
    });
};

const signout = (req, res) => {
  res.clearCookie('jwt').send({ message: SIGNOUT });
};

module.exports = {
  getCurrentUser,
  updateUserInfo,
  createUser,
  login,
  signout,
};
