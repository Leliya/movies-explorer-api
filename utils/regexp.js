const regExpURL = /^https?:\/\/(www\.)?[-\w\-._~:/?#[\]@!$&'()*+,;=]+\.[a-z0-9()]{1,6}\b([-\w\-._~:/?#[\]@!$&'()*+,=]*)$/;
const langRu = /^[\d\sА-Яа-я-._:?#@!$&'()+,;=]+$/;
const langEn = /^[\w\s\-.:?#@!$&'()+,;=]+$/;

module.exports = { regExpURL, langRu, langEn };
