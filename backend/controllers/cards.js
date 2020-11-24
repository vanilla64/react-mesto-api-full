const Card = require('../models/card');

const User = require('../models/user');

module.exports.getCards = async (req, res) => {
  try {
    const cards = await Card.find({}).populate(['likes', 'owner']);

    res.send(cards.reverse());
  } catch (err) {
    console.log(`ERROR: ${err.name}`);
    console.log(`ERROR: ${err.message}`);

    res.status(500).send({ message: 'Ошибка на сервере' });
  }
};

module.exports.getCard = async (req, res) => {
  const { _id } = req.params;

  try {
    const card = await Card.findById(_id)
      .populate('likes')
      .populate('owner');

    if (!card) {
      res.status(404).send({ message: `Карточка с id: ${_id} не найдена!` });
      return;
    }

    res.send(card);
  } catch (err) {
    console.log(`ERROR: ${err.name}`);
    console.log(`ERROR: ${err.message}`);

    if (err.name === 'CastError') {
      res.status(404).send({ message: `Карточка с id: ${_id} не найдена!` });
      return;
    }

    res.status(500).send({ message: 'Ошибка на сервере' });
  }
};

module.exports.createCard = async (req, res) => {
  const { name, link } = req.body;

  try {
    const card = await Card.create({ name, link, owner: req.user._id });

    res.send(card);
  } catch (err) {
    console.log(`ERROR: ${err.name}`);
    console.log(`ERROR: ${err.message}`);

    if (err.name === 'ValidationError') {
      res.status(400).send({ message: 'Введены некорректные данные!' });
      return;
    }

    res.status(500).send({ message: 'Ошибка на сервере' });
  }
};

module.exports.deleteCard = async (req, res) => {
  try {
    const deletedCard = await Card.findById(req.params._id);

    if (!deletedCard) {
      res.status(404).send({ message: `Карточка с id: ${req.params._id} не найдена!` });
      return;
    }

    if (deletedCard.owner.toString() === req.user._id.toString()) {
      await Card.findByIdAndRemove(req.params._id);
      res.send({ message: 'Карточка удалена!' });
      return;
    }

    res
      .status(401)
      .send({ msg: 'Нельзя удалять чужие карточки!' });
  } catch (err) {
    console.log(`ERROR: ${err.name}`);
    console.log(`ERROR: ${err.message}`);

    if (err.name === 'CastError') {
      res.status(404).send({ message: `Карточка с id: ${req.params._id} не найдена!` });
      return;
    }

    res.status(500).send({ message: 'Ошибка на сервере' });
  }
};

module.exports.setLike = async (req, res) => {
  try {
    const { _id } = req.params;
    const user = await User.findById(req.user._id);
    const card = await Card.findById(_id).populate(['likes', 'owner']);

    const isLiked = await card.likes.some(
      (item) => item._id.toString() === req.user._id,
    );

    if (isLiked) {
      res
        .status(403)
        .send({ message: 'Лайк уже поставлен!' });
      return;
    }

    const likedCard = await Card.findByIdAndUpdate(
      _id,
      { $push: { likes: user } },
    ).populate(['likes', 'owner']);

    res.send(likedCard);
  } catch (error) {
    console.log(error);
  }
};

module.exports.deleteLike = async (req, res) => {
  const { _id } = req.params;
  // const user = await User.findById(req.user._id).populate('user');
  const card = await Card.findById(_id).populate(['likes', 'owner']);

  const isLiked = card.likes.some(
    (item) => item._id.toString() === req.user._id,
  );

  if (!isLiked) {
    res
      .status(403)
      .send({ message: 'Лайк не поставлен!' });
    return;
  }

  const unlikedCard = await Card.findByIdAndUpdate(
    _id,
    { likes: [] },
  ).populate(['likes', 'owner']);

  res.send(unlikedCard);
};
