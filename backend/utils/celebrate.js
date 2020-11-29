const { celebrate, Joi } = require('celebrate');

const { linkRegexp } = require('./utils');

const loginValidator = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }).unknown(true),
});

const registerValidator = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().pattern(new RegExp(linkRegexp)),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }).unknown(true),
});

const updateUserValidator = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
  }),
});

const getMeValidator = celebrate({
  headers: Joi.object().keys({
    authorization: Joi.string()
      .pattern(/^Bearer.[A-Za-z0-9-_=]+\.[A-Za-z0-9-_=]+\.?[A-Za-z0-9-_.+/=]*$/)
      .required(),
  })
    .unknown(true),
});

const updateAvatarValidator = celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().pattern(new RegExp(linkRegexp)),
  }),
});

const createCardValidator = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().pattern(new RegExp(linkRegexp)),
  }).unknown(true),
});

const idValidator = celebrate({
  params: Joi.object().keys({
    _id: Joi.string().min(24).max(24).hex(),
  }),
});

const likesCardValidator = celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().min(24).max(24).hex(),
  }),
});

module.exports = {
  loginValidator,
  registerValidator,
  updateUserValidator,
  updateAvatarValidator,
  getMeValidator,
  createCardValidator,
  idValidator,
  likesCardValidator,
};
