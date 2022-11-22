const regExpURL = /^https?:\/\/(www\.)?[-\w\-._~:/?#[\]@!$&'()*+,;=]+\.[a-z0-9()]{1,6}\b([-\w\-._~:/?#[\]@!$&'()*+,=]*)$/;
const langRu = /^[\w\sА-Яа-яЁ\-–—._:*«»"?#@!$&'()+,;=]+$/;
const langEn = /^[\w\sáö\-–—.:*«»"?#@!$&'()+,;=’é]+$/;

module.exports = { regExpURL, langRu, langEn };
