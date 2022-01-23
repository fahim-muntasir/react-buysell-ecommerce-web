const checkLoginController = (req, res) => {
  res.status(200).json({ login: true, loginInfo: req.user });
};

module.exports = checkLoginController;
