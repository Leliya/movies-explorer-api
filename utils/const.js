const INCORRECT_DATA = 'Переданы некорректные данные';
const MOVIE_NOT_FOUND = 'Фильмы не найдены';
const NOT_MY_MOVIE = 'Можно удалять только фильмы, сохраненные Вами';
const MOVIE_ALREADY_DELETE = 'Такой фильм не найден, возможно он уже был удален';

const DOUBLE_EMAIL = 'Пользователь с таким email уже существует';
const USER_NOT_FOUND = 'Пользователь не найден';
const NOT_AUTHORIZATION = 'Необходима авторизация';
const ERROR_AUTHORIZATION = 'Неправильные почта или пароль';

const SERVER_ERROR = 'На сервере произошла ошибка';
const NOT_FOUND = 'Ресурс не найден. Проверьте URL и метод запроса';

const MOVIE_DELETE = 'Фильм удалён';
const SIGNOUT = 'Вы вышли из профиля';

const REQUIRED_COUNTRY = 'Страна является обязательным полем';

const REQUIRED_DIRECTOR = 'Режиссер является обязательным полем';

const REQUIRED_DURATION = 'Длительность является обязательным полем';

const REQUIRED_YEAR = 'Год является обязательным полем';

const REQUIRED_DESCRIPTION = 'Описание является обязательным полем';

const REQUIRED_IMAGE = 'Ссылка на изображение является обязательным полем';

const NOT_LINK = (props) => `${props.value} не является ссылкой`;

const REQUIRED_TRAILER = 'Ссылка на трейлер является обязательным полем';

const REQUIRED_POSTER = 'Ссылка на постер является обязательным полем';

const REQUIRED_NAME_RU = 'Название фильма на русском языке является обязательным полем';

const INCORRECT_NAME_RU = (props) => `Название фильма ${props.value} некорректно, введите название на русском языке`;

const REQUIRED_NAME_EN = 'Название фильма на фнглийском языке является обязательным полем';

const INCORRECT_NAME_EN = (props) => `Название фильма ${props.value} некорректно, введите название на английском языке`;

const REQUIRED_EMAIL = 'Email является обязательным';

const NOT_EMAIL = (props) => `${props.value} не является Email`;

const REQUIRED_PASSWORD = 'Пароль является обязательным';

const REQUIRED_NAME = 'Имя является обязательным';

const SHORT_NAME = 'Имя не может быть короче 2 символов, сейчас {VALUE}';

const LONG_NAME = 'Имя не может быть длиннее 30 символов, сейчас {VALUE}';

module.exports = {
  INCORRECT_DATA,
  MOVIE_NOT_FOUND,
  NOT_MY_MOVIE,
  MOVIE_ALREADY_DELETE,
  DOUBLE_EMAIL,
  USER_NOT_FOUND,
  NOT_AUTHORIZATION,
  ERROR_AUTHORIZATION,
  SERVER_ERROR,
  NOT_FOUND,
  MOVIE_DELETE,
  SIGNOUT,
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
  REQUIRED_EMAIL,
  NOT_EMAIL,
  REQUIRED_PASSWORD,
  REQUIRED_NAME,
  SHORT_NAME,
  LONG_NAME,
};
