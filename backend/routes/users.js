const router = require('express').Router();

const {
  updateUserValidator, updateAvatarValidator, getMeValidator, idValidator,
} = require('../utils/celebrate');

const {
  getUsers, getUser, getCurrentUser, updateUser, updateAvatar,
} = require('../controllers/users');

router.get('/users', getUsers);
router.get('/users/me', getMeValidator, getCurrentUser);
router.patch('/users/me', updateUserValidator, updateUser);
router.patch('/users/me/avatar', updateAvatarValidator, updateAvatar);
router.get('/users/:_id', idValidator, getUser);

module.exports = router;
