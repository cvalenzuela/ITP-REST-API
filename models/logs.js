/*
=====
Logs for DB debuging purposes.
=====
*/

module.exports = (db, dbURI) => {
  db.on('connected', () => {
    console.log('Mongoose connected to ' + dbURI);
  });
  db.on('error', err => {
    console.log('Mongoose connection error ' + err);
  });
  db.on('disconnected', () => {
    console.log('Mongoose disconnected.');
  });
}