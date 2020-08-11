/**
 * See https://www.npmjs.com/package/winston
 */

const winston = require('winston');
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  defaultMeta: { timestamp: new Date().getTime() },
  transports: [
    new winston.transports.File({
      filename: 'logbook.log', 
      options: { 
        flags: 'w' //wipes the logbook on init. Comment this out to keep log history
      }
    }),
  ],
});
module.exports = logger;