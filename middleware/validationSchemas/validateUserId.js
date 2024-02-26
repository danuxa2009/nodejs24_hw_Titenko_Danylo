const yup = require("yup");
const { BAD_REQUEST } = require("../../constants/statusCodes");

const validateUserId = (req, resp, next) => {
  const userSchema = yup.number().integer().min(0);

  try {
    userSchema.validateSync(req.params.userId);
    next();
  } catch (error) {
    resp.status(BAD_REQUEST).send(error.message);
  }
};

module.exports = validateUserId;
