/*
ITP Food API

Controllers
GET
url/api/floor
*/

const sendJSONresponse = require('./../utils/jsonResponse');
const messages = require('./../utils/messages');

module.exports = ((req, res) => {
  sendJSONresponse.ok(res, {} , 'The floor is open');
})