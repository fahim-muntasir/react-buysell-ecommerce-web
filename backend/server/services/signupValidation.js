const SignupUser = require("../model/signup");
const { check, validationResult } = require("express-validator");
const createError = require("http-errors");

const signupValidation = [
  check("name")
    .isLength({ min: 1 })
    .withMessage("Name is required.")
    .isAlpha("en-US", { ignore: " -" })
    .withMessage("Your name is wrong!")
    .trim(),
  check("email")
    .isEmail()
    .custom(async (value) => {
      try {
        const user = await SignupUser.findOne({ email: value });
        if (user) {
          throw createError("This email alrady used!");
        }
      } catch (err) {
        throw createError(err.message);
      }
    })
    .withMessage("Invalid email address!")
    .trim(),
  check("password")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long"),
];

const signupValidationHandler = (req, res, next) => {
  const errors = validationResult(req);
  const mappedError = errors.mapped();

  if (Object.keys(mappedError).length === 0) {
    next();
  } else {
    console.log(mappedError);
    res.status(500).json({ error: mappedError });
  }
};

module.exports = { signupValidation, signupValidationHandler };
