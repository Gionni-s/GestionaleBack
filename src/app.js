const mongoose = require('./services/mongoose');
const express = require('express');
const http = require('http');
const api = require('./api');
const { mongo } = require('./config');

const app = express(api);

const server = http.createServer(app);

setImmediate(async () => {
  if (mongo.createMongo) {
    await mongoose.connect(
      mongo.uri,
      {}
    );
  } else {
    logger.info('\x1B[0;34mMongoose:\x1B[0m DB disabled by .env roule \x1B[0;32m');
  }
});

module.exports = app;
