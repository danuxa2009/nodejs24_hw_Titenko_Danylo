const router = require("express").Router();
const { validateUserData, validateUserId } = require("../middleware/validationSchemas");
const { storage, findUserById, deleteUserById } = require("../utils/storageService");
const { NO_CONTENT, CREATED, NOT_FOUND } = require("../constants/statusCodes");

router.get("/", (_req, resp) => {
  resp.json(storage);
});

router.get("/:userId", validateUserId, (req, resp) => {
  const userData = findUserById(req.params.userId);
  if (userData) {
    resp.json(userData);
  } else {
    resp.status(NOT_FOUND).send("User doesn't exist");
  }
});

router.post("/", validateUserData, (req, resp) => {
  const { body } = req;
  const user = {
    ...body,
    id: Date.now(),
  };

  storage.push(user);
  resp.status(CREATED).json(body);
});

router.delete("/:userId", validateUserId, (req, resp) => {
  const userData = findUserById(req.params.userId);

  if (userData) {
    deleteUserById(req.params.userId);
    resp.sendStatus(NO_CONTENT);
  } else {
    resp.status(NOT_FOUND).send("User doesn't exist");
  }
});

module.exports = {
  router,
};
