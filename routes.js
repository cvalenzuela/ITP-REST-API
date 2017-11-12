/*
ITP Food API

Routes
*/

const express = require('express');
let router = express.Router();
const Controllers = require('./controllers/index');
const multer = require('multer');

// Get the food status
router.get('/food', Controllers.FoodGET);

// Change food status
router.post('/food', multer({ dest: './public/uploads/'}).single('image'), Controllers.FoodPOST)

// Handle Twilio Messages
router.post('/handleTwilio', Controllers.handleTwilio);

module.exports = router;