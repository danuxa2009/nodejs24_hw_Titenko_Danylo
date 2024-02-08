const colorsEnabled = process.env.COLORS_ENABLED === "1"
const logLevel = process.env.LOG_LEVEL || 'warn'

module.exports = {
    colorsEnabled,
    logLevel
}