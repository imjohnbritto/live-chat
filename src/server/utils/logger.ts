import dayjs from 'dayjs';
import { createLogger, format, transports } from 'winston';
import { isProd } from './misc';

const baseFormat = format.combine(
  format.timestamp({ format: dayjs().format('MMM-DD-YYYY HH:mm:ss Z') }),
  format.json()
);

const prettyFormat = format.combine(
  baseFormat,
  format.prettyPrint(),
  format.colorize()
);

export const logger = createLogger({
  level: isProd ? 'info' : 'debug',
  format: isProd ? baseFormat : prettyFormat,
  transports: [new transports.Console()]
});
