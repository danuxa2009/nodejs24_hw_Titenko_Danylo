require("dotenv").config();
const morgan = require("morgan");
const express = require("express");
const { port, storageType } = require("config");
const logger = require("./utils/logger")("server_express");

const { router: userRouter } = require("./routes/users");
const { router: userRouterSqlite } = require("./routes/users_sqlite");
const { rotateErrorLogs, rotateInfoLogs, LOG_TEMPLATE } = require("./middleware/rotateLogs/morganLogs");

const isStorageSqlite = storageType === "sqlite";

const srv = express();
const jsonBodyParser = express.json();

srv.use(jsonBodyParser);
srv.use(rotateErrorLogs);
srv.use(rotateInfoLogs);

srv.use(morgan(LOG_TEMPLATE));
srv.use("/users", isStorageSqlite ? userRouterSqlite : userRouter);

srv.listen(port, () => logger.info(`Server started with storage type [${storageType}] and waiting on ${port} port`));
