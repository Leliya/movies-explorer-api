const User = require('../models/user');

const getCurrentUser = (req, res, next) => {
  //User.findById(req.user._id)
  User.findById('634db50876d0f32ce142e80c')
    .then((user) => res.send({ user }))
    .catch(next);
};

const updateUserInfo = (req, res, next) => {
  const { name, email } = req.body;
  User.findByIdAndUpdate(
    //   req.user._id,
    '634db50876d0f32ce142e80c',
    { name, email },
    { new: true, runValidators: true },
  ).then((user) => res.send(user))
    .catch(next);
};

module.exports = { getCurrentUser, updateUserInfo };
