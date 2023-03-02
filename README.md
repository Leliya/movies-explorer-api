# Backend сервиса Movies Explorer  

_Дипломный проект курса Веб-разработки_  

Репозиторий содержит серверную часть сервиса поиска и сохранения фильмов.  

## Tехнологии:  
 - Node.js;
 - Express.js;
 - Yandex.Cloud;
 - MongoDB;
 - REST API;
 - nginx;
 - npm;
 - GIT;
  
## Методы для работы с сервисом:
  
**Регистрация пользователя**  
  
POST `/signup`
  
**Авторизация пользователя ** 
  
POST `/signin`  
  
**Получение информации о текущем пользователе**  

GET `/users/me`

**Изменение информации о текущем пользователе** 
  
PATCH `/users/me`  
  
**Добавление нового фильма**

POST `/movies`

**Получение фильмов, добавленных текущим пользователем** 

GET `/movies`

**Удаление фильма**

DELETE  `/movies`  

## Использование

1. Склонируйте репозиторий:

```
git clone https://github.com/Leliya/movies-explorer-api.git
```

2. Установите зависимости:

```
npm install
```

3. Проект запускается локально на 3000 порту командой:

```
npm run start
```


## Демо:
  
[`https://api.movies.leliya.nomoredomains.icu/`](https://api.movies.leliya.nomoredomains.icu/) 
