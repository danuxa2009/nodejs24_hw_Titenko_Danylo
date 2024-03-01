const colorsEnabled = process.env.COLORS_ENABLED === "1";
const logLevel = process.env.LOG_LEVEL || "warn";
const port = process.env.PORT || 3000;
const storageType = process.env.STORAGE_TYPE || "sqlite";

module.exports = {
  colorsEnabled,
  logLevel,
  port,
  storageType,
};
