const mongoose = require('mongoose');
const validator = require('validator');
const { langRu, langEn } = require('../utils/regexp');

const movieSchema = new mongoose.Schema({
  country: {
    type: String,
    required: [true, 'Страна является обязательным полем'],
  },
  director: {
    type: String,
    required: [true, 'Режиссер является обязательным полем'],
  },
  duration: {
    type: Number,
    required: [true, 'Длительность является обязательным полем'],
  },
  year: {
    type: String,
    required: [true, 'Год является обязательным полем'],
  },
  description: {
    type: String,
    required: [true, 'Описание является обязательным полем'],
  },
  image: {
    type: String,
    required: [true, 'Ссылка на изображение является обязательным полем'],
    validate: {
      validator: (v) => validator.isURL(v),
      message: (props) => `${props.value} не является ссылкой`,
    },
  },
  trailerLink: {
    type: String,
    required: [true, 'Ссылка на трейлер является обязательным полем'],
    validate: {
      validator: (v) => validator.isURL(v),
      message: (props) => `${props.value} не является ссылкой`,
    },
  },
  thumbnail: {
    type: String,
    required: [true, 'Ссылка на постер является обязательным полем'],
    validate: {
      validator: (v) => validator.isURL(v),
      message: (props) => `${props.value} не является ссылкой`,
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
    required: [true, 'Название фильма на русском языке является обязательным полем'],
    validate: {
      validator: (v) => validator.matches(v, langRu),
      message: (props) => `Название фильма ${props.value} некорректно, введите название на русском языке`,
    },
  },
  nameEN: {
    type: String,
    required: [true, 'Название фильма на фнглийском языке является обязательным полем'],
    validate: {
      validator: (v) => validator.matches(v, langEn),
      message: (props) => `Название фильма ${props.value} некорректно, введите название на английском языке`,
    },
  },
});

module.exports = mongoose.model('movie', movieSchema);
