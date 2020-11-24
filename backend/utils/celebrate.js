const { celebrate, Joi } = require('celebrate');

const bodyUserValidator = celebrate({
  // headers: Joi.object().keys({
  //   authorization: Joi.string().required(),
  // }).unknown(true),
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }).unknown(true),
});

const currentUservalidator = celebrate({
  headers: Joi.object().keys({
    authorization: Joi.string().required(),
  }),
  // body: Joi.object().keys({
  //   email: Joi.string().required().email(),
  //   password: Joi.string().required(),
  // }).unknown(true),
});

const createCardValidator = celebrate({
  headers: Joi.object().keys({
    Authorization: Joi.string().token(),
  }).unknown(true),
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    link: Joi.string().required(),
  }).unknown(true),
});

module.exports = {
  bodyUserValidator,
  currentUservalidator,
  createCardValidator,
};
