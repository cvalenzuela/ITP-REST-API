/*
ITP Food API

Server
*/

const http = require('http');
const express = require('express');
require('./models/db')
const routes = require('./routes');
let router = express.Router();
let bodyParser = require('body-parser');
const paths = require('./utils/paths');

const app = express()

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(paths.API, routes);
app.use(express.static('public'));

http.createServer(app).listen(paths.PORT, () => {
  console.log(`Listening on port ${paths.PORT}`)
})