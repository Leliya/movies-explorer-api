const userRouter = require('express').Router();

const { validationUpdateUserInfo } = require('../middlewares/validation');

const { getCurrentUser, updateUserInfo } = require('../controllers/users');

userRouter.get('/me', getCurrentUser);

userRouter.patch('/me', validationUpdateUserInfo, updateUserInfo);

module.exports = userRouter;
