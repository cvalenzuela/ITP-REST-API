/*
ITP Food API

Controllers
POST
url/api/handleTwilio
*(Only twilio posts to this route!)
*/

const mongoose = require('mongoose');
const Food = mongoose.model('Food');
const User = mongoose.model('User');
const messages = require('./../utils/messages');
const paths = require('./../utils/paths');
const sendJSONresponse = require('./../utils/jsonResponse');
const secret = require('./../credentials');
const apiai = require('apiai');
const MessagingResponse = require('twilio').twiml.MessagingResponse;
const agent = apiai(secret.DIALOGFLOW);

module.exports = (req, res) =>  {
  const twiml = new MessagingResponse();
  let message = twiml.message();
  const texter = req.body;

  const query = { 'phone': texter.From };
  const create = { $setOnInsert: { phone: texter.From } };
  const options = { new: true, upsert: true };

  let sendSMSResponse = (msg, mediaURL) => {
    message.body(msg);
    mediaURL && message.media(paths.UPLOADS + mediaURL)
    res.writeHead(200, { 'Content-Type': 'text/xml' });
    res.end(twiml.toString());
  }

  // User input
  if (texter.Body.indexOf('o food for me') > 0) {
    User.findOneAndRemove({ phone: texter.From }, (err, user) => {
      if (err) {
        sendSMSResponse(messages.subscription.error, false);
      } else {
        sendSMSResponse(messages.subscription.delete, false);
      }
    });
  } else if (texter.Body.indexOf('want food') > 0) {
    User.findOneAndUpdate(query, create, options, (err, user) => {
      if (err) {
        sendSMSResponse(messages.subscription.error, false);
      } else {
        sendSMSResponse(messages.subscription.new, false);
      }
    })
  } else if (texter.Body.indexOf('ood') > 0) {
    Food.find({}, (err, foods) => {
      const food = foods[0];
      if (err) {
        sendSMSResponse(messages.subscription.error, false);
      } else {
        let msg = messages.food.false;
        food.status && (msg = messages.food.true);
        let mediaURL = false;
        food.currentFood.length > 1 && (mediaURL = food.currentFood);
        sendSMSResponse(msg, mediaURL);
      }
    });
  } else {
    let request = agent.textRequest(texter.Body, {
      sessionId: texter.sid
    });

    request.on('response', (response) => {
      sendSMSResponse(response, false);
    });

    request.on('error', (error) => {
      sendSMSResponse(response, false);
    });

    request.end();
  }
};