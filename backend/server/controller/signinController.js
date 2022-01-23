const SignUpUser = require("../model/signup");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const signinController = async (req, res) => {
  try {
    const user = await SignUpUser.findOne({ email: req.body.email });
    if (user && user.id) {
      const passwordVerify = await bcrypt.compare(
        req.body.password,
        user.password
      );
      if (passwordVerify) {
        const token = jwt.sign(
          { id: user._id, name: user.fullname },
          process.env.JWT_SECRET,
          {
            expiresIn: process.env.JWT_EXPIRE,
          }
        );

        res.cookie(process.env.COOKIE_NAME, token, {
          httpOnly: true,
          signed: true,
        });
        res.status(200).json({ msg: "Login successfull." });
      } else {
        res.json({ error: { msg: "Login faild!3" } });
      }
    } else {
      res.json({ error: { msg: "Login faild!2" } });
    }
  } catch {
    res.json({ error: { msg: "Login faild!1" } });
  }
};

module.exports = signinController;
