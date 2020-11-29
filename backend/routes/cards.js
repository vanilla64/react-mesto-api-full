const router = require('express').Router();

const { createCardValidator, idValidator, likesCardValidator } = require('../utils/celebrate');

const {
  getCards, getCard, createCard, deleteCard, setLike, deleteLike,
} = require('../controllers/cards');

router.get('/cards', getCards);
router.get('/cards/:_id', idValidator, getCard);
router.post('/cards', createCardValidator, createCard);
router.delete('/cards/:_id', idValidator, deleteCard);

router.put('/cards/:cardId/likes', likesCardValidator, setLike);
router.delete('/cards/:cardId/likes', likesCardValidator, deleteLike);

module.exports = router;
