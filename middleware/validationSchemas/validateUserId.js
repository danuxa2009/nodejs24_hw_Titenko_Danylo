const yup = require("yup");
const { BAD_REQUEST } = require("../../constants/statusCodes");
const { storageType } = require("config");

const validateUserId = (req, resp, next) => {
  const userSchema =
    storageType === "mongo"
      ? yup.string().length(24, "User id must be exactly 24 characters")
      : yup.number().integer().min(0);

  try {
    userSchema.validateSync(req.params.userId);
    next();
  } catch (error) {
    resp.status(BAD_REQUEST).send(error.message);
  }
};

module.exports = validateUserId;
