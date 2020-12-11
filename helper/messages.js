const moment = require('moment');

function formMessage(text, username) {
  return {
    username,
    text,
    time: moment().format('h:mm a')
  };
} 

module.exports = formMessage;