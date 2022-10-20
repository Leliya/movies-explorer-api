const express = require('express');
require('dotenv').config();

const app = express();
const mongoose = require('mongoose');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
const { cors } = require('./middlewares/cors');
const router = require('./routes/index');
const { handlerErrors, notFound } = require('./middlewares/handlerErrors');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const rateLimit = require('./middlewares/rateLimit');

const { PORT = 3000, NODE_ENV, DATABASE } = process.env;

app.use(rateLimit);
app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

mongoose.connect(NODE_ENV === 'production' ? DATABASE : 'mongodb://localhost:27017/db', {
  useNewUrlParser: true,
  // useCreateIndex: true,
  // useFindAndModify: false
});

app.use(cors);

app.use(requestLogger);

app.use('', router);

app.use(notFound);

app.use(errorLogger);

app.use(errors());

app.use(handlerErrors);

app.listen(PORT);
