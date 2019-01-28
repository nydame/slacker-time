const axios = require('axios');
const debug = require('debug')('slash-command-template:ticket');
const qs = require('querystring');
const realTimeMessaging = require('./rtm');
// const users = require('./users');


// Create message. 
const create = (userId) => {
  return {"userId": userId, "title": "Slacker Time", "description": `hello <@{$userId}>`};
  // const message = {};

//   const fetchUserEmail = new Promise((resolve, reject) => {
//     users.getUserInfo(userId).then((result) => {
//       debug(`Find user: ${userId}`);
//       resolve(result.data.user.profile.email);
//     }).catch((err) => { reject(err); });
//   });

//   fetchUserEmail.then((result) => {
//     message.userId = userId;
//     message.userEmail = result;
//     sendTimeActive(message);

//     return message;
//   }).catch((err) => { console.error(err); });
};

module.exports = { create };