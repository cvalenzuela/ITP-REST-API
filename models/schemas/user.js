/*
=====
- API
-- Models
--- Schemas
---- User
=====
*/

const mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
  phone: {
    type: String,
    unique: true
  }
});

mongoose.model('User', userSchema);