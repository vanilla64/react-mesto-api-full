const router = require('express').Router();

const { loginValidator, registerValidator } = require('../utils/celebrate');
const { createUser, login } = require('../controllers/users');

const { auth } = require('../middlewares/auth');

const routerCards = require('./cards');
const routerUsers = require('./users');

const { sendNotFoundErr } = require('../utils/utils');

router.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

router.post('/signup', registerValidator, createUser);
router.post('/signin', loginValidator, login);

router.use(auth);

router.use(routerCards);
router.use(routerUsers);

router.use('*', sendNotFoundErr);

module.exports = router;
