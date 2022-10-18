const CastError = require('../errors/cast-error');
const DeleteFilmError = require('../errors/delete-film-error');
const NotFoundError = require('../errors/not-found-error');
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

const getMovies = (req, res, next) => {
  Movie.find({ owner: req.user._id })
    .orFail(() => { throw new NotFoundError('Фильмы не найдены'); })
    .then((movies) => res.send(movies))
    .catch(next);
};

const deleteMovie = (req, res, next) => {
  Movie.findById(req.params._id)
    .orFail(() => { throw new NotFoundError('Такой фильм не найден, возможно он уже был удален'); })
    .then((movie) => {
      if (String(movie.owner) !== req.user._id) {
        throw new DeleteFilmError('Можно удалять только фильмы, сохраненные Вами');
      }
      return Movie.findByIdAndRemove(req.params._id)
        .then(() => res.send({ message: 'Фильм удалён' }))
        .catch(next);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return next(new CastError('Переданы некорректные данные'));
      }
      return next(err);
    });
};

module.exports = {
  createMovie,
  getMovies,
  deleteMovie,
};
