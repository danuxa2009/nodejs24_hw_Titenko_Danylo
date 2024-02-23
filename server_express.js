require("dotenv").config();
const path = require("path");
const express = require("express");
const morgan = require("morgan");
const rfs = require("rotating-file-stream");
const logger = require("./utils/logger")("server_express");
const { port } = require("./config/default");
const { router: userRouter } = require("./routes/users");
const { BAD_REQUEST } = require("./constants/statusCodes");
const srv = express();

const LOG_TEMPLATE = "[:method]: :url - :status";
const isRequestWithIssue = (res) => res.statusCode < BAD_REQUEST;

const errorsLogStream = rfs.createStream("server_errors.log", {
  interval: "30m",
  path: path.join(__dirname, "logs"),
});

const infoLogStream = rfs.createStream("server_info.log", {
  interval: "30m",
  path: path.join(__dirname, "logs"),
});

srv.use(
  morgan(LOG_TEMPLATE, {
    skip: (req, res) => isRequestWithIssue(res),
    stream: errorsLogStream,
  })
);
srv.use(
  morgan(LOG_TEMPLATE, {
    skip: (req, res) => !isRequestWithIssue(res),
    stream: infoLogStream,
  })
);
srv.use(morgan(LOG_TEMPLATE));
srv.use("/users", userRouter);

srv.listen(port, () => logger.info(`Server waiting on ${port} port`));
