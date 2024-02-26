const morgan = require("morgan");
const { join } = require("path");
const rfs = require("rotating-file-stream");
const { BAD_REQUEST } = require("../../constants/statusCodes");

const LOG_TEMPLATE = "[:method]: :url - :status";
const isRequestWithIssue = (res) => res.statusCode < BAD_REQUEST;

const errorsLogStream = rfs.createStream("server_errors.log", {
  interval: "1m",
  path: join(".", "logs"),
});

const infoLogStream = rfs.createStream("server_info.log", {
  interval: "1m",
  path: join(".", "logs"),
});

const rotateErrorLogs = morgan(LOG_TEMPLATE, {
  skip: (_req, res) => isRequestWithIssue(res),
  stream: errorsLogStream,
});

const rotateInfoLogs = morgan(LOG_TEMPLATE, {
  skip: (_req, res) => !isRequestWithIssue(res),
  stream: infoLogStream,
});

module.exports = {
  LOG_TEMPLATE,
  rotateErrorLogs,
  rotateInfoLogs,
};
