import winston from 'winston';
import 'winston-daily-rotate-file';

const { combine, timestamp, printf } = winston.format;

const logFormat = printf(({ level, message, timestamp }) => {
  return `[${timestamp}] ${level.toUpperCase()}: ${message}`;
});

const tcpTransport = new (winston.transports).DailyRotateFile({
  filename: 'logs/tcp-%DATE%.log',
  datePattern: 'YYYY-MM-DD',
  zippedArchive: true,   
  maxSize: '20m',        
  maxFiles: '30d',
});

const logger = winston.createLogger({
  level: 'debug',
  format: combine(timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }), logFormat),
  transports: [
    tcpTransport,
    new winston.transports.Console(),
  ],
});

export default logger;
