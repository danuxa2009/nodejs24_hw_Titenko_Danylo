function logger(moduleName) {
    return {
        info: (message) => console.info(`${moduleName}: ${message}`),
        warn: (message) => console.warn(`${moduleName}: ${message}`),
        error: (message) => console.error(`${moduleName}: ${message}`)
    }
}

module.exports = logger 