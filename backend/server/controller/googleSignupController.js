const { OAuth2Client } = require("google-auth-library");
const SignupUser = require("../model/signup");

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const googleSignupController = async (req, res) => {
  try {
    const { token } = req.body;
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGEL_CLIENT_ID,
    });
    const { name, email, picture } = ticket.getPayload();

    const findUser = await SignupUser.findOne({ email: email });
    if (findUser && findUser._id) {
      res
        .status(200)
        .json({
          msg: "Login successfull.",
          loginInfo: { name, email, picture },
        });
    } else {
      const createUser = await new SignupUser({
        fullname: name,
        email: email,
        password: email + process.env.JWT_SECRET,
      });
      const result = await createUser.save();
      res
        .status(200)
        .json({
          msg: "Login successfull.",
          loginInfo: { name, email, picture },
        });
    }
  } catch {
    res.status(500).josn({ msg: "Login faild!" });
  }
};

module.exports = googleSignupController;
