const jwt = require('jsonwebtoken');

const { SECRET_KEY } = require('../config/config');

module.exports.auth = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization
    || !authorization.startsWith('Bearer ')) {
    return res
      .status(401)
      .send({ message: 'Необходима авторизация' });
  }

  try {
    const token = authorization.replace('Bearer ', '');
    const payload = jwt.verify(token, SECRET_KEY);

    req.user = payload;
  } catch (err) {
    return res
      .status(401)
      .send({ message: 'Необходима авторизация' });
  }

  return next();
};
