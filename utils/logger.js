const { bgRed, bgGray, bgBrightYellow, disable: disableColors } = require("colors/safe");
const { existsSync, createWriteStream, mkdirSync } = require("fs");
const { join } = require("path");

const { colorsEnabled, logLevel } = require("config");
const { getCurrentTimestamp } = require("../helpers/getCurrentTimestamp");

const LOG_PRIORITY = ['info', 'warn', 'error'];

const LOGS_DIRECTORY = join(".", "logs");
const INFO_LOG_FILE = join(LOGS_DIRECTORY, "info.log");
const ERROR_LOG_FILE = join(LOGS_DIRECTORY, "errors.log");

if (!colorsEnabled) {
  disableColors();
}

if (!existsSync(LOGS_DIRECTORY)) {
  mkdirSync(LOGS_DIRECTORY);
}

const infoStream = createWriteStream(INFO_LOG_FILE, { flags: 'a' });
const errorStream = createWriteStream(ERROR_LOG_FILE, { flags: 'a' });

const streams = {
  info: infoStream,
  warn: errorStream,
  error: errorStream,
}

const logger = (moduleName) => {
  const writeLogsToFile = (consoleType, ...consoleMessages) => {
    const timestamp = getCurrentTimestamp();
    const message = `${timestamp} - ${consoleType.toUpperCase()}: ${consoleMessages.join(" ")}\n`;

    streams[consoleType].write(message);
  };

  /**
   * @param {'info' | 'warn' | 'error'} consoleType
   * @param {string} styledtext
   * @param  {...any} consoleMessages
   */
  const handleLogMethod = (consoleType, styledtext, ...consoleMessages) => {
    const shouldLogToConsole = LOG_PRIORITY.indexOf(consoleType) >= LOG_PRIORITY.indexOf(logLevel);
    if (shouldLogToConsole) {
      console[consoleType](styledtext, ...consoleMessages);
    }

    writeLogsToFile(consoleType, ...consoleMessages);
  };

  return {
    info: (...args) => handleLogMethod("info", `${bgGray(moduleName)}:`, ...args),
    warn: (...args) => handleLogMethod("warn", `${bgBrightYellow.italic(moduleName)}:`, ...args),
    error: (...args) => handleLogMethod("error", `${bgRed.bold(moduleName)}:`, ...args),
  };
};

process.on("beforeExit", () => {
  infoStream.end();
  errorStream.end();
});

module.exports = logger;
