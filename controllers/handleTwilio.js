/*
ITP Food API

Controllers
POST
url/api/handleTwilio
*(Only twilio posts to this route!)
*/

// const db = require('./../db');
const mongoose = require('mongoose');
const User = mongoose.model('User');
const messages = require('./../utils/messages');
const JSONresponses = require('./../utils/jsonResponse');
const MessagingResponse = require('twilio').twiml.MessagingResponse;

module.exports = (req, res) =>  {
  const twiml = new MessagingResponse();
  let message = twiml.message();
  const texter = req.body;
  const TEMPNUMBER = '+31234567890';
  const query = {
    $or: [
      { 'phone': TEMPNUMBER }
    ]
  };
  const create = {
    $setOnInsert: {
      phone: TEMPNUMBER
    }
  };
  const options = {
    new: true,
    upsert: true,
    setDefaultsOnInsert: true,
    runValidators: true
  };
  User.findOneAndUpdate(query, create, options, (err, user) => {
    if (err) {
      if (err._message == 'Validation failed') {
        console.log('The parameters to create e new user are invalid');
      } else {
        console.log('Creating a new user');
      }
    }
  })
  // Possible user inputs
  // if (texter.Body.indexOf('nsubscribe') > 0) {
  //   if (db.subscribers.has(texter.From)) {
  //     db.subscribers.delete(texter.From);
  //     message.body(messages.subscription.delete);
  //   }
  // } else if (texter.Body.indexOf('ubscribe') > 0) {
  //   if (!db.subscribers.has(texter.From)) {
  //     // db.subscribers.add(texter.From);
  //     message.body(messages.subscription.new);
  //   }
  // } else if (texter.Body.indexOf('ood') > 0) {
  //   if (db.foodStatus) {
  //     message.body(messages.food.true);
  //     console.log('http://165.227.188.111:9888/uploads/' + db.currentFood);
  //     message.media('http://165.227.188.111:9888/uploads/' + db.currentFood);
  //   } else {
  //     console.log('Not food in the db')
  //     message.body(messages.food.false);
  //   }
  // } else {
  //   message.body(messages.others.again);
  // }

  // res.writeHead(200, { 'Content-Type': 'text/xml' });
  // res.end(twiml.toString());
}