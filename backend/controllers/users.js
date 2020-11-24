const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');

const { SECRET_KEY } = require('../config/config');

const User = require('../models/user');

module.exports.getUsers = async (req, res) => {
  try {
    const users = await User.find({});

    res.send(users);
  } catch (err) {
    console.log(`ERROR: ${err.name}`);
    console.log(`ERROR: ${err.message}`);

    res
      .status(500)
      .send({ message: 'Ошибка на сервере' });
  }
};

module.exports.getUser = async (req, res) => {
  const { _id } = req.params;

  try {
    const user = await User.findById(_id);

    if (!user) {
      res.status(404).send({ message: `Пользователь с id: ${_id} не найден!` });
      return;
    }

    res.send(user);
  } catch (err) {
    console.log(`ERROR: ${err.name}`);
    console.log(`ERROR: ${err.message}`);

    if (err.name === 'CastError') {
      res.status(404).send({ message: `Пользователь с id: ${_id} не найден!` });
      console.log(`ERROR: ${err.message}`);
      return;
    }

    res.status(500).send({ message: 'Ошибка на сервере' });
  }
};

module.exports.getCurrentUser = async (req, res) => {
  const currentUser = await User.findById(req.user._id);
  res.send(currentUser);
};

module.exports.updateUser = async (req, res, next) => {
  try {
    const { name, about } = req.body;

    const user = await User.findByIdAndUpdate(
      req.user._id,
      { name, about },
    );
    res.send(user)
  } catch (err) {
    next(err);
  }
};

module.exports.updateAvatar = async (req, res, next) => {
  try {
    const { avatar } = req.body;

    const user = await User.findByIdAndUpdate(
      req.user._id,
      { avatar },
    );

    res.send(user)
  } catch (err) {
    next(err);
  }
};

module.exports.createUser = async (req, res) => {
  try {
    const {
      name, about, avatar, email, password,
    } = req.body;

    const existedEmail = await User.findOne({ email });

    if (existedEmail) {
      res
        .status(401)
        .send({ message: 'Email уже зарегистрирован!' });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create(
      {
        name, about, avatar, email, password: hashedPassword,
      },
    );

    res.status(200).send(user);
  } catch (err) {
    console.log(`ERROR: ${err.name}`);
    console.log(`ERROR: ${err.message}`);

    if (err.name === 'ValidationError') {
      res
        .status(400)
        .send({ message: 'Введены некорректные данные!' });
      return;
    }

    res
      .status(500)
      .send({ message: 'Ошибка на сервере' });
  }
};

module.exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select('+password');

    if (!user) {
      res
        .status(401)
        .send({ message: 'Неправильные почта или пароль' });
      return;
    }

    const matchedPassword = await bcrypt.compare(password, user.password);

    if (!matchedPassword) {
      res
        .status(401)
        .send({ message: 'Неправильные почта или пароль' });
      return;
    }

    const token = jwt.sign(
      { _id: user._id },
      SECRET_KEY,
      { expiresIn: '7d' },
    );
    res.send({
      message: 'Успешная аутентификация',
      token,
    });
  } catch (err) {
    console.log(`ERROR: ${err.name}`);
    console.log(`ERROR: ${err.message}`);

    res
      .status(401)
      .send({ message: err.message });
  }
};
