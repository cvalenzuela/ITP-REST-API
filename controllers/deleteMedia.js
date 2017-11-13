/*
ITP Food API

Controllers
Twilio webhook callback
https://www.twilio.com/docs/guides/how-to-confirm-delivery-in-node-js#getting-status-events-for-twiml-generated-messages
POST
url/api/deleteMedia
*/

const secret = require('./../credentials');
const twilio = require('twilio');
const twilioClient = new twilio(secret.SID, secret.TOKEN);

module.exports = ((req, res) => {
  const messageSid = req.body.MessageSid;
  const messageStatus = req.body.MessageStatus;

  if(messageStatus == 'delivered'){
    // Delete the image from twilio server
    twilioClient.messages(messageSid).media.each((media) => {
        media.remove()
          .then(() => {
            console.log(`Sid ${media.sid} deleted successfully.`);
          })
          .catch((err) => console.log(err));
      }
    )
  }

  res.end();
})