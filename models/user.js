const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const validator = require('validator');
const AuthorizationError = require('../errors/authorization-error');
const {
  REQUIRED_EMAIL,
  NOT_EMAIL,
  REQUIRED_PASSWORD,
  REQUIRED_NAME,
  SHORT_NAME,
  LONG_NAME,
  ERROR_AUTHORIZATION,
} = require('../utils/const');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, REQUIRED_EMAIL],
    unique: true,
    validate: {
      validator: (v) => validator.isEmail(v),
      message: NOT_EMAIL,
    },
  },
  password: {
    type: String,
    required: [true, REQUIRED_PASSWORD],
    select: false,
  },
  name: {
    type: String,
    required: [true, REQUIRED_NAME],
    minlength: [2, SHORT_NAME],
    maxlength: [30, LONG_NAME],
  },
});

userSchema.statics.findUserByCredentials = function findUser(email, password) {
  return this.findOne({ email }).select('+password').then((user) => {
    if (!user) {
      return Promise.reject(new AuthorizationError(ERROR_AUTHORIZATION));
    }
    return bcrypt.compare(password, user.password)
      .then((matched) => {
        if (!matched) {
          return Promise.reject(new AuthorizationError(ERROR_AUTHORIZATION));
        }
        return user;
      });
  });
};

module.exports = mongoose.model('user', userSchema);
