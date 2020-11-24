const router = require('express').Router();

const { bodyUserValidator } = require('../utils/celebrate');
const { createUser, login } = require('../controllers/users');

const { auth } = require('../middlewares/auth');

const routerCards = require('./cards');
const routerUsers = require('./users');

const { sendNotFoundErr } = require('../utils/utils');

router.post('/signup', bodyUserValidator, createUser);
router.post('/signin', bodyUserValidator, login);

router.use(auth);

router.use(routerCards);
router.use(routerUsers);

router.get('/', sendNotFoundErr);
router.post('/', sendNotFoundErr);
router.get('/:url', sendNotFoundErr);
router.post('/:url', sendNotFoundErr);

module.exports = router;
