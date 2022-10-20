const router = require('express').Router();
const userRouter = require('./users');
const movieRouter = require('./movies');
const auth = require('../middlewares/auth');
const { validationCreateUser, validationLogin } = require('../middlewares/validation');

const { createUser, login, signout } = require('../controllers/users');

router.post('/signup', validationCreateUser, createUser);

router.post('/signin', validationLogin, login);

router.use(auth);

router.post('/signout', signout);

router.use('/users', userRouter);
router.use('/movies', movieRouter);

module.exports = router;
