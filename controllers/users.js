const User = require('../models/user');

const getCurrentUser = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => res.send({ user }))
    .catch(next);
};

module.exports = { getCurrentUser };
