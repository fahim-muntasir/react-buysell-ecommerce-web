const mongoose = require("mongoose");

const signupSchema = new mongoose.Schema({
  fullname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  resetToken: String,
  resetExpaire: Date,
  mobileNumber: {
    type: Number,
  },
  password: {
    type: String,
    required: true,
  },
});

const signup = mongoose.model("SignupUser", signupSchema);

module.exports = signup;
