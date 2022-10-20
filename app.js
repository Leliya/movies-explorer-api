const express = require('express');
require('dotenv').config();

const app = express();
const mongoose = require('mongoose');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
const { cors } = require('./middlewares/cors');
const userRouter = require('./routes/users');
const movieRouter = require('./routes/movies');
const router = require('./routes/router');
const auth = require('./middlewares/auth');
const { handlerErrors, notFound } = require('./middlewares/handlerErrors');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const { PORT = 3000 } = process.env;

app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

mongoose.connect('mongodb://localhost:27017/movies', {
  useNewUrlParser: true,
  // useCreateIndex: true,
  // useFindAndModify: false
});

app.use(cors);

app.use(requestLogger);

app.use('', router);

app.use(auth);

app.use('/users', userRouter);
app.use('/movies', movieRouter);

app.use(notFound);

app.use(errorLogger);

app.use(errors());

app.use(handlerErrors);

app.listen(PORT);
