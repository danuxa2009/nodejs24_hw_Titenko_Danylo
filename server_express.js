require("dotenv").config();
const morgan = require("morgan");
const express = require("express");
const logger = require("./utils/logger")("server_express");
const { port } = require("./config/default");
const { router: userRouter } = require("./routes/users");
const { saveUsersToDB } = require("./utils/storageService");
const { rotateErrorLogs, rotateInfoLogs, LOG_TEMPLATE } = require("./middleware/rotateLogs/morganLogs");

const srv = express();
const jsonBodyParser = express.json();

srv.use(jsonBodyParser);
srv.use(rotateErrorLogs);
srv.use(rotateInfoLogs);

srv.use(morgan(LOG_TEMPLATE));
srv.use("/users", userRouter);

process.on("beforeExit", () => {
  saveUsersToDB();
  process.exit();
});

process.on("SIGINT", () => {
  saveUsersToDB();
  process.exit();
});

srv.listen(port, () => logger.info(`Server waiting on ${port} port`));
