const movieRouter = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { regExpURL, langRu, langEn } = require('../utils/regexp');

const { createMovie, getMovies } = require('../controllers/movies');

movieRouter.post('/', celebrate(
  {
    body: Joi.object().keys({
      country: Joi.string().required(),
      director: Joi.string().required(),
      duration: Joi.number().required().positive(),
      year: Joi.string().required().length(4),
      description: Joi.string().required(),
      image: Joi.string().required().pattern(regExpURL),
      trailerLink: Joi.string().required().pattern(regExpURL),
      nameRU: Joi.string().required().pattern(langRu),
      nameEN: Joi.string().required().pattern(langEn),
      thumbnail: Joi.string().required().pattern(regExpURL),
      movieId: Joi.number().required().positive(),
      owner: Joi.string().hex().length(24).required(),
    }),
  },
), createMovie);

movieRouter.get('/', getMovies);

module.exports = movieRouter;
