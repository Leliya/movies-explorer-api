const { celebrate, Joi } = require('celebrate');
const { regExpURL, langRu, langEn } = require('../utils/regexp');

const validationUpdateUserInfo = celebrate(
  {
    body: Joi.object().keys({
      name: Joi.string().min(2).max(30).required(),
      email: Joi.string().email().required(),
    }),
  },
);

const validationCreateMovie = celebrate(
  {
    body: Joi.object().keys({
      country: Joi.string().required(),
      director: Joi.string().required(),
      duration: Joi.number().required().positive().integer(),
      year: Joi.string().required(),
      description: Joi.string().required(),
      image: Joi.string().required().pattern(regExpURL),
      trailerLink: Joi.string().required().pattern(regExpURL),
      nameRU: Joi.string().required().pattern(langRu),
      nameEN: Joi.string().required().pattern(langEn),
      thumbnail: Joi.string().required().pattern(regExpURL),
      movieId: Joi.number().required().positive(),
    }),
  },
);

const validationDeleteMovie = celebrate(
  {
    params: Joi.object().keys({
      _id: Joi.string().hex().length(24).required(),
    }),
  },
);

const validationCreateUser = celebrate(
  {
    body: Joi.object().keys({
      name: Joi.string().min(2).max(30).required(),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    }),
  },
);

const validationLogin = celebrate(
  {
    body: Joi.object().keys({
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    }),
  },
);

module.exports = {
  validationUpdateUserInfo,
  validationCreateMovie,
  validationDeleteMovie,
  validationCreateUser,
  validationLogin,
};
