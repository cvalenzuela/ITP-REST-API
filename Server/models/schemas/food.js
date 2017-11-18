/*
=====
- API
-- Models
--- Schemas
---- Food
=====
*/

const mongoose = require('mongoose');

var foodSchema = new mongoose.Schema({
  status: {
    type: Boolean
  },
  currentFood: {
    type: String
  }
});

mongoose.model('Food', foodSchema);