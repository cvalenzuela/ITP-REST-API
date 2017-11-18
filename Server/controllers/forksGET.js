/*
ITP Food API

Controllers
GET
url/api/forks
*/

const sendJSONresponse = require('./../utils/jsonResponse');
const messages = require('./../utils/messages');

module.exports = ((req, res) => {
  sendJSONresponse.ok(res, {} , messages.others.forks);
})