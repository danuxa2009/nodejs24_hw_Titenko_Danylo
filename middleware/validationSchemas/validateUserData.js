const yup = require("yup");
const { BAD_REQUEST } = require("../../constants/statusCodes");

const validateUserData = (req, resp, next) => {
  const validationSchema = yup.object({
    username: yup
      .string()
      .trim()
      .min(3, "Username should me at least 3 characters")
      .required("Username shouldn't be empty"),
    email: yup.string().trim().email("Invalid email format").required("Email shouldn't be empty"),
  });

  try {
    validationSchema.validateSync(req.body);
    next();
  } catch (error) {
    resp.status(BAD_REQUEST).send(error.message);
  }
};

module.exports = validateUserData;
