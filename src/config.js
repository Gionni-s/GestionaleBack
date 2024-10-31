const logger = require('./services/logger');
const _ = require('lodash');
require('dotenv').config();

global.logger = logger;
global._ = _;

const requireProcessEnv = (name) => {
  if (!process.env[name]) {
    throw new Error('La variabile ' + name + ' è necessario per il corretto funzionamento del server');
  }
  return process.env[name];
};

const isWin = process.platform == 'win32';
const APP_NAME = requireProcessEnv('APP_NAME');
const mongoUrl = process.env.MONGO_URL || 'mongodb://root:example@localhost:27017/';

const config = {
  all: {
    appName: _.capitalize(APP_NAME),
    port: process.env.PORT || 9000,
    privateKey: requireProcessEnv('PRIVATE_KEY'),
    ip: requireProcessEnv('URL'),
    env: requireProcessEnv('ENV'),
    mongo: {
      createMongo: requireProcessEnv('CREATE_MONGO') === 'true',
      options: {
        strictQuery: false,
        strictPopulate: false
      }
    }
  },

  test: {
    mongo: {
      uri: `mongodb://localhost:27888/${APP_NAME}-test`,
      options: {
        debug: false,
      }
    }
  },
  development: {
    mongo: {
      uri: `${mongoUrl}${APP_NAME}-dev`,
      // uri: `${mongoUrl}`,
      options: {
        debug: true,
      }
    }
  },
  production: {
    ip: process.env.IP,
    port: process.env.PORT || 8080,
    expressSSLRedirect: process.env.DISABLE_SSL_REDIRECT !== 'true',
    mongo: {
      uri: `${mongoUrl}${APP_NAME}`
    }
  }
};

module.exports = _.merge(config.all, config[config.all.env]);