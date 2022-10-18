const CastError = require('../errors/cast-error');
// const NotFoundError = require('../errors/not-found-error');
const Movie = require('../models/movie');

const createMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
  } = req.body;
  Movie.create(
    {
      country,
      director,
      duration,
      year,
      description,
      image,
      trailerLink,
      nameRU,
      nameEN,
      thumbnail,
      movieId,
      owner: req.user._id,
    },
  ).then((newMovie) => Movie.findById(newMovie._id)
    .populate('owner')
    .then((movie) => res.send(movie))
    .catch(next))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new CastError('Переданы некорректные данные'));
      }
      return next(err);
    });
};

module.exports = {
  createMovie,
};
