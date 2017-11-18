/*
=====
DB Connection
=====
*/

let mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

let dbURI = 'mongodb://localhost/itp';
if (process.env.NODE_ENV === 'production') {
  dbURI = 'mongodb://165.227.188.111/itp';
}
let logs = require('./logs');
let gracefulShutdown = require('./gracefulShutdown');

// Connect to itp DB with blubird promises
let itpDB = mongoose.connect(dbURI, {
  useMongoClient: true
});
itpDB.then((db) => {
  // DB is ready here
});

// Logs and Shutdown
logs(itpDB, dbURI);
gracefulShutdown(itpDB);

// Schemas
require('./schemas/user');
require('./schemas/food');
