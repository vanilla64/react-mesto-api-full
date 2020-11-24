const { Schema, model } = require('mongoose');
const mongoose = require('mongoose');

const { linkRegexp } = require('../utils/utils');

const cardSchema = new Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  link: {
    type: String,
    required: true,
    validate: {
      validator: (url) => linkRegexp.test(url),
      message: (props) => `${props.value} некорректный URL!`,
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  // likes: [{
  //   type: [mongoose.Schema.Types.ObjectId],
  //   // type: Array(mongoose.Schema.Types.ObjectId),
  //   ref: 'user',
  //   default: undefined,
  // }],

  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'user' }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = model('card', cardSchema);
