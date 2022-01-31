const winston = require("winston");
const path = require("path");

// logger config using winson
module.exports = winston.createLogger({
  format: winston.format.combine(
    winston.format.splat(),
    winston.format.timestamp({
      format: "YYYY-MM-DD HH:mm:ss",
    }),
    winston.format.colorize(),
    winston.format.printf((log) => {
      // show stack trace if error log
      if (log.stack) return `[${log.timestamp}] [${log.level}] ${log.stack}`;
      // else show message
      return `[${log.timestamp}] [${log.level}] ${log.message}`;
    })
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({
      level: "error",
      filename: path.join(__dirname, "log/errors.log"),
    }),
  ],
});
