const SignupUser = require("../model/signup");
const bcrypt = require("bcrypt");

const resetNewpasswordController = async (req, res) => {
  try {
    const { token, newPassword } = req.body;
    const hashNewPassword = await bcrypt.hash(newPassword, 10);
    const setNewpassword = await SignupUser.findOneAndUpdate(
      { resetToken: token },
      {
        password: hashNewPassword,
        resetToken: null,
        resetExpaire: null,
      }
    );
    res.status(200).json({ msg: "Password set successfull." });
  } catch {
    res.status(404).json({ error: { msg: "Your token doesn't find!" } });
  }
};

module.exports = resetNewpasswordController;
