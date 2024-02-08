require("dotenv").config();
const logger = require("./utils/logger")("main");

logger.info("Info log");
logger.warn("Warn log");
logger.error("Error log");
