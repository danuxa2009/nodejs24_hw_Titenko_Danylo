require("dotenv").config();
const morgan = require("morgan");
const express = require("express");
const logger = require("./utils/logger")("server_express");
const { port, storageType } = require("./config/default");
const { router: userRouter } = require("./routes/users");
const { router: userRouterSqlite } = require("./routes/users_sqlite");
const { saveUsersToDB } = require("./utils/usersService");
const { rotateErrorLogs, rotateInfoLogs, LOG_TEMPLATE } = require("./middleware/rotateLogs/morganLogs");
const isStorageSqlite = storageType === "sqlite";

const srv = express();
const jsonBodyParser = express.json();

srv.use(jsonBodyParser);
srv.use(rotateErrorLogs);
srv.use(rotateInfoLogs);

srv.use(morgan(LOG_TEMPLATE));
srv.use("/users", isStorageSqlite ? userRouterSqlite : userRouter);

if (!isStorageSqlite) {
  process.on("beforeExit", () => {
    saveUsersToDB();
    process.exit();
  });

  process.on("SIGINT", () => {
    saveUsersToDB();
    process.exit();
  });
}

srv.listen(port, () => logger.info(`Server started with storage type [${storageType}] and waiting on ${port} port`));
