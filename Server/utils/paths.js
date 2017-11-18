/*
Handy Paths Module
*/

const PROTOCOL = 'http://'
const IP = '165.227.188.111';
const PORT = '9888'

module.exports = {
  API: '/api',
  UPLOADS: PROTOCOL + IP + ':' + PORT + '/uploads/',
  DELETEMEDIA: PROTOCOL + IP + ':' + PORT + '/api/deleteMedia/',
  PORT,
  IP
}