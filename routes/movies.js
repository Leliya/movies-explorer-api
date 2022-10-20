const movieRouter = require('express').Router();

const { validationCreateMovie, validationDeleteMovie } = require('../middlewares/validation');

const { createMovie, getMovies, deleteMovie } = require('../controllers/movies');

movieRouter.post('/', validationCreateMovie, createMovie);

movieRouter.get('/', getMovies);

movieRouter.delete('/:_id', validationDeleteMovie, deleteMovie);

module.exports = movieRouter;
