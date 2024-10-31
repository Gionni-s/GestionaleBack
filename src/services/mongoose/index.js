const mongoose = require('mongoose');

mongoose.connection.on('sucess', err => {
  logger.info('MongoDB connection sucess: ' + err);
});


mongoose.connection.on('error', err => {
  logger.error('MongoDB connection error: ' + err);
  process.exit(-1);
});

module.exports = mongoose;
