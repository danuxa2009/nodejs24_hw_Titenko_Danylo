const router = require("express").Router();
const { validateUserData, validateUserId } = require("../middleware/validationSchemas");
const { getUserById, deleteUserById, saveUsersToDB, getAllUsers } = require("../utils/usersService_mongo");
const { NO_CONTENT, CREATED, NOT_FOUND } = require("../constants/statusCodes");

router.get("/", async (_req, resp) => {
  const users = await getAllUsers();
  resp.json(users);
});

router.get("/:userId", validateUserId, async (req, resp) => {
  const userData = await getUserById(req.params.userId);

  if (userData) {
    resp.json(userData);
  } else {
    resp.status(NOT_FOUND).send("User doesn't exist");
  }
});

router.post("/", validateUserData, (req, resp) => {
  const { body } = req;
  saveUsersToDB(body);
  resp.status(CREATED).json(body);
});

router.delete("/:userId", validateUserId, async (req, resp) => {
  const userData = await deleteUserById(req.params.userId);

  if (userData) {
    resp.sendStatus(NO_CONTENT);
  } else {
    resp.status(NOT_FOUND).send("User doesn't exist");
  }
});

module.exports = {
  router,
};
