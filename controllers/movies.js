const CastError = require('../errors/cast-error');
const DeleteFilmError = require('../errors/delete-film-error');
const NotFoundError = require('../errors/not-found-error');
const Movie = require('../models/movie');
const {
  INCORRECT_DATA,
  MOVIE_NOT_FOUND,
  NOT_MY_MOVIE,
  MOVIE_ALREADY_DELETE,
  MOVIE_DELETE,
} = require('../utils/const');

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
        return next(new CastError(INCORRECT_DATA));
      }
      return next(err);
    });
};

const getMovies = (req, res, next) => {
  Movie.find({ owner: req.user._id })
    .orFail(() => { throw new NotFoundError(MOVIE_NOT_FOUND); })
    .then((movies) => res.send(movies))
    .catch(next);
};

const deleteMovie = (req, res, next) => {
  Movie.findById(req.params._id)
    .orFail(() => { throw new NotFoundError(MOVIE_ALREADY_DELETE); })
    .then((movie) => {
      if (String(movie.owner) !== req.user._id) {
        throw new DeleteFilmError(NOT_MY_MOVIE);
      }
      return Movie.findByIdAndRemove(req.params._id)
        .then(() => res.send({ message: MOVIE_DELETE }))
        .catch(next);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return next(new CastError(INCORRECT_DATA));
      }
      return next(err);
    });
};

module.exports = {
  createMovie,
  getMovies,
  deleteMovie,
};
