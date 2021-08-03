require('dotenv').config();

const express = require('express');
const cors = require('cors');

const app = express();
const mongoose = require('mongoose');

const { PORT = 5000 } = process.env;

const { errors } = require('celebrate');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const dbUrl = 'mongodb://localhost:27017/mestodb';
const mongooseOptions = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
};

const router = require('./routes/router');

mongoose.connect(dbUrl, mongooseOptions);

app.use(cors());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(requestLogger);

app.use('/', router);

app.use(errorLogger);

app.use(errors());

app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;

  console.log(`ERROR: ${err.name}`);
  console.log(`ERROR: ${err.message}`);

  res
    .status(statusCode)
    .send({
      message: statusCode === 500
        ? 'На сервере произошла ошибка'
        : message,
    });

  next();
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
