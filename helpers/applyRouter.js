const { router: userRouter } = require("../routes/users");
const { router: userRouterSqlite } = require("../routes/users_sqlite");
const { router: userRouterMongo } = require("../routes/users_mongo");
const { storageType } = require("config");

const applyRouter = () => {
  switch (storageType) {
    case "sqlite":
      return userRouterSqlite;
    case "mongo":
      return userRouterMongo;
    case "array":
      return userRouter;
  }
};

module.exports = applyRouter;
