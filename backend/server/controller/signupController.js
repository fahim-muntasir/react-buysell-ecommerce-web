const bcrypt = require("bcrypt");
const Signup = require("../model/signup");

const signupController = async (req, res) => {
  const hashPassword = await bcrypt.hash(req.body.password, 10);
  const signup = await new Signup({
    fullname: req.body.name,
    email: req.body.email,
    mobileNumber: req.body.mobileNo,
    password: hashPassword,
  });
  try {
    const result = await signup.save();
    res.status(200).json({ msg: "Signup successfull!" });
  } catch (err) {
    console.log(err);
    res.status(400).json({ error: { msg: "Signup faild!" } });
  }
};

module.exports = signupController;
