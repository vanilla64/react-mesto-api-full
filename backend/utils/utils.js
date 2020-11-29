const NotFoundError = require('../errors/NotFoundError');

const linkRegexp = /^(https?):\/\/(w{3}\.)?[^#~!@$%^&*)(\s]+\.\w+\/?([^#~!@$%^&*)(\s]+)?[#]?$/i;

const sendNotFoundErr = () => {
  throw new NotFoundError('Запрашиваемый ресурс не найден');
};

module.exports = { linkRegexp, sendNotFoundErr };
