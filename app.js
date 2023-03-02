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
const { handlerErrors } = require('./middlewares/handlerErrors');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const rateLimit = require('./middlewares/rateLimit');
const { devDataBase } = require('./utils/devConfig');

const { PORT = 4000, NODE_ENV, DATABASE } = process.env;

app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

mongoose.connect(NODE_ENV === 'production' ? DATABASE : devDataBase, {
  useNewUrlParser: true,
  // useCreateIndex: true,
  // useFindAndModify: false
});

app.use(requestLogger);

app.use(rateLimit);

app.use(cors);

app.use('', router);

app.use(errorLogger);

app.use(errors());

app.use(handlerErrors);

app.listen(PORT);
