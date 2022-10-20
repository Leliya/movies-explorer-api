# Backend сервиса Movies Explorer  

## Дипломный проект курса Веб-разработки  

Репозиторий содержит серверную часть сервиса поиска и сохранения фильмов.  



**Использован следующий стек технологий:**  
 - Node.js;
 - Express.js;
 - Yandex.Cloud;
 - MongoDB;
 - REST API;
 - nginx;
 - npm;
 - GIT;
  
## Методы для работы  с сервисом:
---
  
`Регистрация пользователя`  
  
POST-запрос на роут `/signup`
  
`Авторизация пользователя`  
  
POST-запрос на роут `/signin`  
  
`Получение информации о текущем пользователе`  

GET-запрос на роут `/users/me`

`Изменение информации о текущем пользователе` 
  
PATCH-запрос на роут `/users/me`  
  
`Создание нового фильма`

POST-запрос на роут `/movies`

`Получение фильмов, созданных текущим пользователем`  

GET-запрос на роут `/movies`

`Удаление фильма`

DELETE-запрос на роут `/movies`

---

## Обратиться к серверу можно по адресу:
  
[`https://api.movies.leliya.nomoredomains.icu/`](https://api.movies.leliya.nomoredomains.icu/) 
