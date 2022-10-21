const mongoose = require('mongoose');
const validator = require('validator');
const { langRu, langEn } = require('../utils/regexp');
const {
  REQUIRED_COUNTRY,
  REQUIRED_DIRECTOR,
  REQUIRED_DURATION,
  REQUIRED_YEAR,
  REQUIRED_DESCRIPTION,
  REQUIRED_IMAGE,
  NOT_LINK,
  REQUIRED_TRAILER,
  REQUIRED_POSTER,
  REQUIRED_NAME_RU,
  INCORRECT_NAME_RU,
  REQUIRED_NAME_EN,
  INCORRECT_NAME_EN,
} = require('../utils/const');

const movieSchema = new mongoose.Schema({
  country: {
    type: String,
    required: [true, REQUIRED_COUNTRY],
  },
  director: {
    type: String,
    required: [true, REQUIRED_DIRECTOR],
  },
  duration: {
    type: Number,
    required: [true, REQUIRED_DURATION],
  },
  year: {
    type: String,
    required: [true, REQUIRED_YEAR],
  },
  description: {
    type: String,
    required: [true, REQUIRED_DESCRIPTION],
  },
  image: {
    type: String,
    required: [true, REQUIRED_IMAGE],
    validate: {
      validator: (v) => validator.isURL(v),
      message: NOT_LINK,
    },
  },
  trailerLink: {
    type: String,
    required: [true, REQUIRED_TRAILER],
    validate: {
      validator: (v) => validator.isURL(v),
      message: NOT_LINK,
    },
  },
  thumbnail: {
    type: String,
    required: [true, REQUIRED_POSTER],
    validate: {
      validator: (v) => validator.isURL(v),
      message: NOT_LINK,
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  movieId: {
    type: Number,
    required: true,
  },
  nameRU: {
    type: String,
    required: [true, REQUIRED_NAME_RU],
    validate: {
      validator: (v) => validator.matches(v, langRu),
      message: INCORRECT_NAME_RU,
    },
  },
  nameEN: {
    type: String,
    required: [true, REQUIRED_NAME_EN],
    validate: {
      validator: (v) => validator.matches(v, langEn),
      message: INCORRECT_NAME_EN,
    },
  },
});

module.exports = mongoose.model('movie', movieSchema);
