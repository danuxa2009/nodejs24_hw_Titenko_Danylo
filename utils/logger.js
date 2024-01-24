function logger(moduleName) {
    return {
        info: (...arg) => console.info(`${moduleName}:`, ...arg),
        warn: (...arg) => console.warn(`${moduleName}:`, ...arg),
        error: (...arg) => console.error(`${moduleName}:`, ...arg),
    }
}

module.exports = logger 