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

// Get the forks status
router.get('/forks', Controllers.ForksGET);

// Get the floor status
router.get('/floor', Controllers.FloorGET);

// Handle Twilio Messages
router.post('/handleTwilio', Controllers.handleTwilio);

// Delete Media (imgs) once Twilio has send them
router.post('/deleteMedia', Controllers.deleteMedia);

module.exports = router;