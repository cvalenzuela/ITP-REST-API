/*
ITP Food API

Controllers
POST
url/api/food
*/

const mongoose = require('mongoose');
const Food = mongoose.model('Food');
const User = mongoose.model('User');
const twilio = require('twilio');
const messages = require('./../utils/messages');
const secret = require('./../credentials');
const sendJSONresponse = require('./../utils/jsonResponse');
const paths = require('./../utils/paths');
const twilioClient = new twilio(secret.SID, secret.TOKEN);

module.exports = (req, res) =>  {
  let img = req.file;

  if (req.body.token != secret.ITPKEY) {
    sendJSONresponse.badRequest(res, {}, 'You dont have the rights access or the token is invalid');
  } else {
    if (!req.body.status && !img) {
      sendJSONresponse.badRequest(res, {}, messages.devices.noData);
    } else if (!req.body.status && img) {
      sendJSONresponse.badRequest(res, {}, messages.devices.noStatus);
    } else {
      // Change the food status
      let filename = '';
      req.body.status && img && (filename = img.filename);

      const update = {
        $set: {
          status: req.body.status,
          currentFood: filename
        }
      };
      Food.findOneAndUpdate({}, update, { new: true, upsert: true }, (err, food) => {
        if (err) {
          sendJSONresponse.internalServerError(res, err, 'Updating the food status');
          return;
        }
        if (!food) {
          sendJSONresponse.notFound(res, {});
        } else {
          User.find({}, (err, users) => {
            // Send an SMS to all users
            food.status && users.forEach(user =>  {
              let SMS = {
                body: messages.food.announcement,
                to: user.phone,
                from: secret.NUMBER
              };
              img && (SMS.mediaUrl = paths.UPLOADS + img.filename);
              // Send the SMS
              twilioClient.messages.create(SMS).then((message) => {
                console.log(message)
                // Delete the image from twilio servers
                console.log('=======')
                client.messages(message.sid).media.each((media) => {
                    console.log(media)
                    // mediaSid.remove()
                    //   .then(() => {
                    //     console.log(`Sid ${mediaSid} deleted successfully.`);
                    //   })
                    //   .catch((err) => console.log(err));
                  }
                )
              });
            });
          })
          sendJSONresponse.ok(res, { foodStatus: food.status, currentFood: food.currentFood }, messages.food.updated);
        }
      });
    }
  }
}