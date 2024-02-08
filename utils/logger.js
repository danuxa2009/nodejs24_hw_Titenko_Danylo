const { bgRed, bgGray, bgBrightYellow, disable } = require("colors/safe");
const { colorsEnabled, logLevel: configLogLevel } = require("config");
const { existsSync, createWriteStream, mkdirSync } = require("fs");
const { join } = require("path");
const { getCurrentTimestamp } = require("../helpers/getCurrentTimestamp");

const LOGS_DIRECTORY = join(".", "logs");
const INFO_LOG_FILE = join(LOGS_DIRECTORY, "info.log");
const ERROR_LOG_FILE = join(LOGS_DIRECTORY, "errors.log");

if (!existsSync(LOGS_DIRECTORY)) {
  mkdirSync(LOGS_DIRECTORY);
}

const infoStream = createWriteStream(INFO_LOG_FILE);
const errorStream = createWriteStream(ERROR_LOG_FILE);

const logger = (moduleName) => {
  const logLevel = configLogLevel || "warn";
  const disableMethod = () => {};
  const infoMethod = logLevel === "info" ? console.info : disableMethod;
  const warnMethod = ["info", "warn"].includes(logLevel) ? console.warn : disableMethod;

  if (!colorsEnabled) {
    disable();
  }

  const writeLogsToFile = (consoleType, ...consoleMessages) => {
    const timestamp = getCurrentTimestamp();
    const message = `${timestamp} - ${consoleType.toUpperCase()}: ${consoleMessages.join(" ")}\n`;

    if (consoleType === "info") {
      infoStream.write(message);
    } else {
      errorStream.write(message);
    }
  };

  const handleLogMethod = (consoleType, logFn, consoleStyles, ...consoleMessages) => {
    writeLogsToFile(consoleType, ...consoleMessages);
    logFn(consoleStyles, ...consoleMessages);
  };

  return {
    info: (...args) => handleLogMethod("info", infoMethod, `${bgGray(moduleName)}:`, ...args),
    warn: (...args) => handleLogMethod("warn", warnMethod, `${bgBrightYellow.italic(moduleName)}:`, ...args),
    error: (...args) => handleLogMethod("error", console.error, `${bgRed.bold(moduleName)}:`, ...args),
  };
};

process.on("beforeExit", () => {
  infoStream.end();
  errorStream.end();
});

module.exports = logger;
