const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const validator = require('validator');
const AuthorizationError = require('../errors/authorization-error');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'Email является обязательным'],
    unique: true,
    validate: {
      validator: (v) => validator.isEmail(v),
      message: (props) => `${props.value} не является Email`,
    },
  },
  password: {
    type: String,
    required: [true, 'Пароль является обязательным'],
    select: false,
  },
  name: {
    type: String,
    required: [true, 'Имя является обязательным'],
    minlength: [2, 'Имя не может быть короче 2 символов, сейчас {VALUE}'],
    maxlength: [30, 'Имя не может быть длиннее 30 символов, сейчас {VALUE}'],
  },
});

userSchema.statics.findUserByCredentials = function findUser(email, password) {
  return this.findOne({ email }).select('+password').then((user) => {
    if (!user) {
      return Promise.reject(new AuthorizationError('Неправильные почта или пароль'));
    }
    return bcrypt.compare(password, user.password)
      .then((matched) => {
        if (!matched) {
          return Promise.reject(new AuthorizationError('Неправильные почта или пароль'));
        }
        return user;
      });
  });
};

module.exports = mongoose.model('user', userSchema);
