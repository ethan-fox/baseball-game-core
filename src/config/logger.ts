import { createLogger, format, transports } from 'winston';

export const logger = createLogger({
    level: 'silly',
    format: format.combine(
        format.colorize({ all: true }),
        format.simple()
    ),
    transports: [ new transports.Console() ]
});