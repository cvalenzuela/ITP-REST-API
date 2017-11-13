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
  let msg = '';
  let isMedia = false;
  let mediaURL = '';

  // Possible user inputs
  if (texter.Body.indexOf('o food for me') > 0) {
    if (db.subscribers.has(texter.From)) {
      User.findOneAndRemove({ phone: texter.From }, (err, user) => {
        if (err) {
          msg = messages.subscription.error;
        } else {
          msg = messages.subscription.delete;
        }
      });
    }
  } else if (texter.Body.indexOf('want food') > 0) {
    User.findOneAndUpdate(query, create, options, (err, user) => {
      if (err) {
        msg = messages.subscription.error;
      } else {
        msg = messages.subscription.new;
      }
    })
  } else if (texter.Body.indexOf('ood') > 0) {
    Food.find({}, (err, foods) => {
      const food = foods[0];
      if (err) {
        msg = messages.subscription.error;
      } else {
        food.status ? msg = messages.food.true : msg = messages.food.false;
        if(food.currentFood.length > 1){
          mediaURL = food.currentFood;
          isMedia = true;
        } else {
          isMedia = false;
        } 
      }
    });
  } else {
    msg = messages.others.again;
  }

  message.body(msg);
  isMedia && message.media(paths.UPLOADS + mediaURL)
  res.writeHead(200, { 'Content-Type': 'text/xml' });
  res.end(twiml.toString());
}