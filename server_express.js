require("dotenv").config();
const morgan = require("morgan");
const express = require("express");
const applyRouter = require("./helpers/applyRouter");
const logger = require("./utils/logger")("server_express");

const { port, storageType } = require("config");
const { rotateErrorLogs, rotateInfoLogs, LOG_TEMPLATE } = require("./middleware/rotateLogs/morganLogs");

const srv = express();
const jsonBodyParser = express.json();

srv.use(jsonBodyParser);
srv.use(rotateErrorLogs);
srv.use(rotateInfoLogs);

srv.use(morgan(LOG_TEMPLATE));
srv.use("/users", applyRouter());

srv.listen(port, () =>
  logger.info(`Server started with storage type [${storageType}] and waiting on ${port} port`)
);
