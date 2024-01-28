const { bgRed, bgGray, bgBrightYellow, disable } = require('colors/safe')
const { colorsEnabled, logLevel } = require('config')

const logger = (moduleName) => {
    if (!colorsEnabled) {
        disable()
    }
    const disabledMethod = () => { }


    const logMethods = {
        info: (...args) => console.info(`${bgGray(moduleName)}:`, ...args),
        warn: (...args) => console.warn(`${bgBrightYellow.italic(moduleName)}:`, ...args),
        error: (...args) => console.error(`${bgRed.bold(moduleName)}:`, ...args),
    }

    const warnLogLevel = { ...logMethods, info: disabledMethod }

    switch (logLevel) {
        case "info":
            return logMethods;
        case "warn":
            return warnLogLevel;
        case "error":
            return { ...logMethods, info: disabledMethod, warn: disabledMethod }
        default:
            return warnLogLevel;
    }

}

module.exports = logger 