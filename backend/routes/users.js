const router = require('express').Router();

const { currentUservalidator } = require('../utils/celebrate');

const {
  getUsers, getUser, getCurrentUser, updateUser, updateAvatar
} = require('../controllers/users');

router.get('/users', getUsers);
router.get('/users/me', getCurrentUser);
router.patch('/users/me', updateUser);
router.patch('/users/me/avatar', updateAvatar);
router.get('/users/:_id', getUser);

module.exports = router;
