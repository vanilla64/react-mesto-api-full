const router = require('express').Router();

const {
  getCards, getCard, createCard, deleteCard, setLike, deleteLike,
} = require('../controllers/cards');

router.get('/cards', getCards);
router.get('/cards/:_id', getCard);
router.post('/cards', createCard);
router.delete('/cards/:_id', deleteCard);

router.put('/cards/likes/:_id', setLike);
router.delete('/cards/likes/:_id', deleteLike);

module.exports = router;
