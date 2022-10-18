const userRouter = require('express').Router();
// const {celebrate, Joi } = require('celebrate');

const { getCurrentUser } = require('../controllers/users');

userRouter.get('/me', getCurrentUser);

module.exports = userRouter;
