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
const MessagingResponse = require('twilio').twiml.MessagingResponse;

module.exports = (req, res) =>  {
  console.log('new msg arriving');
  const twiml = new MessagingResponse();
  let message = twiml.message();
  const texter = req.body;

  const query = { 'phone': texter.From };
  const create = { $setOnInsert: { phone: texter.From } };
  const options = { new: true, upsert: true };

  // Possible user inputs
  if (texter.Body.indexOf('o food for me') > 0) {
    console.log(texter.From, 'wants to unsubscribe');
    if (db.subscribers.has(texter.From)) {
      User.findOneAndRemove({ phone: texter.From }, (err, user) => {
        if (err) {
          message.body(messages.subscription.error);
        } else {
          console.log(messages.subscription.delete);
          message.body(messages.subscription.delete);
        }
      });
    }
  } else if (texter.Body.indexOf('want food') > 0) {
    console.log(texter.From, 'wants to subscribe');
    User.findOneAndUpdate(query, create, options, (err, user) => {
      if (err) {
        message.body(messages.subscription.error);
      } else {
        console.log(messages.subscription.new);
        message.body(messages.subscription.new);
      }
    })
  } else if (texter.Body.indexOf('ood') > 0) {
    console.log(texter.From, 'wants to status');
    Food.find({}, (err, foods) => {
      const food = foods[0];
      if (err) {
        message.body(messages.subscription.error);
      } else {
        console.log(messages.food.true);
        food.status ? message.body(messages.food.true) : message.body(messages.food.false);
        food.currentFood.length > 1 && (message.media(paths.UPLOADS + food.currentFood));
      }
    });
  } else {
    console.log(messages.food.true);
    message.body(messages.others.again);
  }
  message.body('test message');
  res.writeHead(200, { 'Content-Type': 'text/xml' });
  res.end(twiml.toString());
}