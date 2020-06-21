import { Config } from './config';

const winston = require('winston');
import WinstonCloudWatch from 'winston-cloudwatch';
const transports = process.env.NODE_ENV === 'production' ? [
      new WinstonCloudWatch({
        logGroupName: process.env.NODE_ENV,
        logStreamName: Config.logging.streamName,
        awsRegion: Config.logging.region,
      })
  ]:
  [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' }),
  ];
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  defaultMeta: { timestamp: new Date() },
  transports: transports,
});
logger.stream = {
  write: (message: string, encoding: string) => {
    logger.info(message);
  },
};
//
// If we're not in production then log to the `console` with the format:
// `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
//
if (process.env.NODE_ENV !== 'production') {
  logger.add(
    new winston.transports.Console({
      format: winston.format.json(),
    }),
  );
}

export { logger };
