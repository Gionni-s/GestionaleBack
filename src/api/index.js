const express = require('express');
const { port, env } = require('../config');
const cors = require('cors');
const fs = require('fs');
const appRoot = require('app-root-path');
const path = require('path');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logger.expressLogger);

fs.readdirSync(appRoot.toString() + '/src/api')
  .filter(f => !f.startsWith('_'))
  .map(f => ({
    name: f,
    module: path.join(appRoot.toString() + '/src/api', f)
  }))
  .filter(a => fs.statSync(a.module).isDirectory())
  .forEach(a => {
    if (fs.existsSync(path.join(a.module, '/index.js'))) {
      app.use('/' + a.name, require(path.join(a.module, '/index.js')));
    }
  });

app.use('/Api', (req, res) => {
  res.status(200).send({
    message: 'Api documents not exist'
  });
});

app.use('/', (req, res) => {
  res.status(200).send({
    message: 'Service is running!',
    version: '1.0'
  });
});

app.listen(port, () => {
  logger.info(`\x1B[0;34mExpress:\x1B[0m Server listening on port\x1B[0;32m ${port}\x1B[0m, in ${env} mode`);
});