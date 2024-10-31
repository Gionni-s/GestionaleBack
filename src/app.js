const mongoose = require('./services/mongoose')
const express = require('express');
const http = require('http');
const api = require('./api');
const { port, ip, mongo, env } = require('./config');

const app = express(api);

const server = http.createServer(app);

setImmediate(async () => {
  if (mongo.createMongo) {
    await mongoose.connect(
      mongo.uri,
      {}
    );
  } else {

  }
});

module.exports = app;
