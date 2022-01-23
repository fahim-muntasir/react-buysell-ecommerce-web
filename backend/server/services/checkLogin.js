const jwt = require("jsonwebtoken");
const checkLoginByGoogle = require("./checkLoginByGoogle");

const checkLogin = (req, res, next) => {
  tokenId = req.body ? req.body.tokenId : false;
  if (tokenId) {
    checkLoginByGoogle(tokenId, (response) => {
      if (response.error) {
        res.json({ error: { msg: "Plaease Login!" } });
      } else {
        req.user = response;
        next();
      }
    });
  } else {
    const cookie =
      Object.keys(req.signedCookies).length > 0 ? req.signedCookies : null;

    if (cookie) {
      const token = cookie[process.env.COOKIE_NAME];
      if (token) {
        const tokenVerifyCheck = jwt.verify(token, process.env.JWT_SECRET);
        if (tokenVerifyCheck) {
          req.user = tokenVerifyCheck;
          next();
        } else {
          res.json({ error: { msg: "Plaease Login!" } });
        }
      } else {
        res.json({ error: { msg: "Plaease Login!" } });
      }
    } else {
      res.json({ error: { msg: "Plaease Login!" } });
    }
  }
};

module.exports = checkLogin;
