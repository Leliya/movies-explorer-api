const CastError = require('../errors/cast-error');
const NotFoundError = require('../errors/not-found-error');
const User = require('../models/user');

const getCurrentUser = (req, res, next) => {
  // User.findById(req.user._id)
  User.findById('634db50876d0f32ce142e80c')
    .orFail(() => { throw new NotFoundError('Пользователь не найден'); })
    .then((user) => res.send(user))
    .catch(next);
};

const updateUserInfo = (req, res, next) => {
  const { name, email } = req.body;
  User.findByIdAndUpdate(
    //   req.user._id,
    '634db50876d0f32ce142e80c',
    { name, email },
    { new: true, runValidators: true },
  ).orFail(() => { throw new NotFoundError('Пользователь не найден'); })
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new CastError('Проверьте введенные данные'));
      }
      return next(err);
    });
};

module.exports = { getCurrentUser, updateUserInfo };
