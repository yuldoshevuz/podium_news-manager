import { createLogger, format, transports } from 'winston';

export const logger = createLogger({
  level: 'info',
  format: format.combine(
    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    format.errors({ stack: true }),
    format.splat(),
    format.json(),
  ),
  defaultMeta: { service: 'user-service' },
  transports: [
    new transports.File({ filename: 'logs/error.winston.log', level: 'error' }),
    new transports.File({ filename: 'logs/combined.winston.log' }),
  ],
});

logger.add(
  new transports.Console({
    format: format.combine(format.colorize(), format.simple()),
  }),
);
