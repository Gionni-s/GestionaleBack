const { createLogger, format, transports } = require('winston');
const { combine, timestamp, printf, colorize } = format;

// formatting console message 
const consoleFormat = printf(({ level, message, timestamp }) => {
  return `${timestamp} ${level}: ${message}`;
});

// Define the log format for file
const fileFormat = printf(({ level, message, timestamp }) => {
  return `${timestamp} ${level}: ${message}`;
});

const logger = createLogger({
  format: combine(
    timestamp({ format: 'YYYY-MM-DD HH:mm:ss' })
  ),
  transports: [
    new transports.Console({
      format: combine(
        format.colorize(),
        consoleFormat
      )
    }),
    new transports.File({
      level: 'info',
      filename: 'logs/info.log',
      format: fileFormat
    }),
    new transports.File({
      level: 'errors',
      filename: 'logs/error.log',
      format: fileFormat
    }),

  ]
});


module.exports = logger
