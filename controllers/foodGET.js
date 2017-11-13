/*
ITP Food API

Controllers
GET
url/api/food
*/

const mongoose = require('mongoose');
const Food = mongoose.model('Food');
const sendJSONresponse = require('./../utils/jsonResponse');
const messages = require('./../utils/messages');
const paths = require('./../utils/paths');

module.exports = ((req, res) => {
  Food.find({}, (err, foods) => {
    const food = foods[0];
    if (err) {
      sendJSONresponse.internalServerError(res, err, 'Could not get the food status');
    } else {
      let msg = messages.food.false;
      let currentFood = '';
      food.status && (msg = messages.food.true);
      food.currentFood.length > 1 && (currentFood = paths.UPLOADS + food.currentFood);
      
      sendJSONresponse.ok(res, {
        currentFood,
        status: food.status
      }, msg);
    }
  });
})