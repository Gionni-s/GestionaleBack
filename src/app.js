const mongoose = require('./services/mongoose')
const express = require('express');
const http = require('http');
const api = require('./api');
const { port, ip, mongo, env } = require('./config');

const app = express(api);

const server = http.createServer(app);

setImmediate(async () => {
  await mongoose.connect(
    mongo.uri,
    {}
  );

  // server.listen(port, ip, () => {
  //   logger.info(`\x1B[0;34mExpress:\x1B[0m Server listening on http://${ip}:${port}, in ${env} mode`);
  // });

});

module.exports = app;
