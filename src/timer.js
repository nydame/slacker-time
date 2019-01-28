const axios = require('axios');
const debug = require('debug')('slash-command-template:ticket');
const qs = require('querystring');
const users = require('./users');

/*
 *  Send time spent in Slack via chat.postMessage to the user who created it
 */
const sendTimeActive = (ticket) => {
  axios.post('https://slack.com/api/chat.postMessage', qs.stringify({
    token: process.env.SLACK_ACCESS_TOKEN,
    channel: ticket.userId,
    as_user: true,
    text: 'Helpdesk ticket created!',
    attachments: JSON.stringify([
      {
        title: `Ticket created for ${ticket.userEmail}`,
        // Get this from the 3rd party helpdesk system
        title_link: 'http://example.com',
        text: ticket.text,
        fields: [
          {
            title: 'Title',
            value: ticket.title,
          },
          {
            title: 'Description',
            value: ticket.description || 'None provided',
          },
          {
            title: 'Status',
            value: 'Open',
            short: true,
          },
          {
            title: 'Urgency',
            value: ticket.urgency,
            short: true,
          },
        ],
      },
    ]),
  })).then((result) => {
    debug('sendTimeActive: %o', result.data);
  }).catch((err) => {
    debug('sendTimeActive error: %o', err);
    console.error(err);
  });
};

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

module.exports = { create, sendTimeActive };