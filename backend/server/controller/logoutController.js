const logoutController = (req, res) => {
  res.clearCookie(process.env.COOKIE_NAME);
  res.send("Logout successfull.");
};

module.exports = logoutController;
