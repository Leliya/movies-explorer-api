const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const { createUser, login, signout } = require('../controllers/users');

router.post('/signup', celebrate(
  {
    body: Joi.object().keys({
      name: Joi.string().min(2).max(30).required(),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    }),
  },
), createUser);

router.post('/signin', celebrate(
  {
    body: Joi.object().keys({
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    }),
  },
), login);

router.post('/signout', signout);

module.exports = router;
