const router = require("express").Router();
const { NO_CONTENT } = require("../constants/statusCodes");

router.get("/", (req, resp) => {
  resp.send("get user");
});

router.get("/:userId", (req, resp) => {
  resp.send("get by id");
});

router.post("/", (req, resp) => {
  resp.send("post user");
});

router.delete("/:userId", (req, resp) => {
  resp.sendStatus(NO_CONTENT);
});

module.exports = {
  router,
};
