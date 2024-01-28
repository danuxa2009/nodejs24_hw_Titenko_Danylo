require('dotenv').config()

const logger = require('./utils/logger')('main');

logger.info('info text message');
logger.warn('warn text message');
logger.error('error text message');

