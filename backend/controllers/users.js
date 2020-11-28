const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');

const { NODE_ENV, JWT_SECRET } = process.env;

const User = require('../models/user');

const BadRequestError = require('../errors/BadRequestError');
const AuthError = require('../errors/AuthError');
const NotFoundError = require('../errors/NotFoundError');

module.exports.getUsers = async (req, res, next) => {
  try {
    const users = await User.find({});

    res.send(users);
  } catch (err) {
    next(err);
  }
};

module.exports.getUser = async (req, res, next) => {
  const { _id } = req.params;

  try {
    const user = await User.findById(_id);

    if (!user) {
      throw new NotFoundError(`Пользователь с id: ${_id} не найден!`);
    }

    res.send(user);
  } catch (err) {
    if (err.name === 'CastError') {
      next(new NotFoundError(`Пользователь с id: ${_id} не найден!`));
      return;
    }

    next(err);
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
    res.send(user);
  } catch (err) {
    next(err);
  }
};

module.exports.updateAvatar = async (req, res, next) => {
  const { _id } = req.params;

  try {
    const { avatar } = req.body;

    const user = await User.findByIdAndUpdate(
      req.user._id,
      { avatar },
    );

    res.send(user);
  } catch (err) {
    if (err.name === 'CastError') {
      next(new NotFoundError(`Пользователь с id: ${_id} не найден!`));
      return;
    }

    next(err);
  }
};

module.exports.createUser = async (req, res, next) => {
  try {
    const {
      name, about, avatar, email, password,
    } = req.body;

    const existedEmail = await User.findOne({ email });

    if (existedEmail) {
      throw new AuthError('Email уже зарегистрирован!');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create(
      {
        name, about, avatar, email, password: hashedPassword,
      },
    );

    res.status(200).send(user);
  } catch (err) {
    if (err.name === 'ValidationError') {
      next(new BadRequestError('Введены некорректные данные!'));
      return;
    }

    next(err);
  }
};

module.exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select('+password');

    if (!user) {
      throw new AuthError('Неправильные почта или пароль');
    }

    const matchedPassword = await bcrypt.compare(password, user.password);

    if (!matchedPassword) {
      throw new AuthError('Неправильные почта или пароль');
    }

    const token = jwt.sign(
      { _id: user._id },
      NODE_ENV === 'production'
        ? JWT_SECRET : 'dick-cunt-pan',
      { expiresIn: '7d' },
    );
    res.send({
      message: 'Успешная аутентификация',
      token,
    });
  } catch (err) {
    next(new AuthError(err.message));
  }
};
