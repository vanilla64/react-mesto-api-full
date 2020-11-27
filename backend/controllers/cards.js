const Card = require('../models/card');

const User = require('../models/user');

const BadRequestError = require('../errors/BadRequestError');
const AuthError = require('../errors/AuthError');
const ForbiddenError = require('../errors/ForbiddenError');
const NotFoundError = require('../errors/NotFoundError');

module.exports.getCards = async (req, res, next) => {
  try {
    const cards = await Card.find({}).populate(['likes', 'owner']);

    res.send(cards.reverse());
  } catch (err) {
    next(err);
  }
};

module.exports.getCard = async (req, res, next) => {
  const { _id } = req.params;

  try {
    const card = await Card.findById(_id)
      .populate('likes')
      .populate('owner');

    if (!card) {
      throw new NotFoundError(`Карточка с id: ${_id} не найдена!`);
    }

    res.send(card);
  } catch (err) {
    if (err.name === 'CastError') {
      next(new NotFoundError(`Карточка с id: ${_id} не найдена!`));
      return;
    }
    next(err);
  }
};

module.exports.createCard = async (req, res, next) => {
  const { name, link } = req.body;

  try {
    const card = await Card.create({ name, link, owner: req.user._id });

    res.send(card);
  } catch (err) {
    if (err.name === 'ValidationError') {
      next(new BadRequestError('Введены некорректные данные!'));
      return;
    }

    next(err);
  }
};

module.exports.deleteCard = async (req, res, next) => {
  try {
    const deletedCard = await Card.findById(req.params._id);

    if (!deletedCard) {
      throw new NotFoundError(`Карточка с id: ${req.params._id} не найдена!`);
    }

    if (deletedCard.owner.toString() === req.user._id.toString()) {
      await Card.findByIdAndRemove(req.params._id);
      res.send({ message: 'Карточка удалена!' });
      return;
    }

    throw new AuthError('Нельзя удалять чужие карточки!');
  } catch (err) {
    if (err.name === 'CastError') {
      next(new NotFoundError(`Карточка с id: ${req.params._id} не найдена!`));
      return;
    }

    next(err);
  }
};

module.exports.setLike = async (req, res, next) => {
  const { _id } = req.params;

  try {
    const user = await User.findById(req.user._id);
    const card = await Card.findById(_id).populate(['likes', 'owner']);

    const isLiked = await card.likes.find(
      (item) => item._id.toString() === req.user._id,
    );

    if (isLiked) {
      throw new ForbiddenError('Лайк уже поставлен!');
    }

    await Card.findByIdAndUpdate(
      _id,
      { $push: { likes: user } },
    ).populate(['likes', 'owner']);

    const updatedCard = await
    Card.findById(_id).populate(['likes', 'owner']);

    res.send(updatedCard);
  } catch (err) {
    if (err.name === 'CastError') {
      next(new NotFoundError(`Карточка с id: ${_id} не найдена!`));
      return;
    }
    next(err);
  }
};

module.exports.deleteLike = async (req, res, next) => {
  const { _id } = req.params;

  try {
    const user = await User.findById(req.user._id);
    const card = await Card.findById(_id).populate(['likes', 'owner']);

    const isLiked = card.likes.some(
      (item) => item._id.toString() === req.user._id,
    );

    if (!isLiked) {
      throw new ForbiddenError('Лайк не поставлен!');
    }

    await Card.findByIdAndUpdate(
      _id,
      { $pull: { likes: user._id } },
    ).populate(['likes', 'owner']);

    const updatedCard = await
    Card.findById(_id).populate(['likes', 'owner']);

    res.send(updatedCard);
  } catch (err) {
    if (err.name === 'CastError') {
      next(new NotFoundError(`Карточка с id: ${_id} не найдена!`));
      return;
    }
    next(err);
  }
};
