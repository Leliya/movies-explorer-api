const userRouter = require('express').Router();
// const {celebrate, Joi } = require('celebrate');

const { getCurrentUser, updateUserInfo } = require('../controllers/users');

userRouter.get('/me', getCurrentUser);

userRouter.patch('/me', updateUserInfo);

module.exports = userRouter;
