const SignupUser = require("../model/signup");
const nodemailer = require("nodemailer");
const { v4: uuidv4 } = require("uuid");

const resetController = async (req, res) => {
  try {
    const id = uuidv4();
    const user = await SignupUser.findOneAndUpdate(
      { email: req.body.email },
      { resetToken: id, resetExpaire: Date.now() }
    );
    if (user) {
      const output = `
        <h1>Buy&Sell</h1>
        <b>Reset your password</b>
        <a href="${process.env.APP_URL}/reset/${id}"><button style="background:#0ea5e9; outline:none; border:none; padding:5px 10px">Reset Password</button></a>
        `;

      // create reusable transporter object using the default SMTP transport
      let transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.EMAIL_ADDRESS, // generated ethereal user
          pass: process.env.EMAIL_PAS, // generated ethereal password
        },
        tls: {
          rejectUnauthorized: false,
        },
      });

      // send mail with defined transport object
      let info = await transporter.sendMail({
        from: `"Buy & sell" ${process.env.EMAIL_ADDRESS}`, // sender address
        to: req.body.email, // list of receivers
        subject: "Reset your Buy & Sell password", // Subject line
        text: "Reset password.", // plain text body
        html: output, // html body
      });
      res
        .status(200)
        .json({ msg: "Please, check your mail for reset password." });
    }
  } catch (err) {
    console.log(err);
  }
};

module.exports = resetController;
