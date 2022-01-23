const router = require("express").Router();

const signupController = require("../controller/signupController");
const signinController = require("../controller/signinController");
const {
  signupValidation,
  signupValidationHandler,
} = require("../services/signupValidation");
const checkLogin = require("../services/checkLogin");
const checkLoginController = require("../controller/checkLoginController");
const logoutcontroller = require("../controller/logoutController");
const productController = require("../controller/productController");
const avatarUpload = require("../controller/avatarUpload");
const googleSignupController = require("../controller/googleSignupController");
const resetController = require("../controller/resetController");
const resetNewpasswordController = require("../controller/resetNewpasswordController");
const searchProdctController = require("../controller/searchProdctController");

// all router
router.post(
  "/signup",
  signupValidation,
  signupValidationHandler,
  signupController
);
router.post("/google/signup", googleSignupController);
router.post("/signin", signinController);
router.post("/checklogin", checkLogin, checkLoginController);
router.post("/logout", logoutcontroller);
router.post("/reset", resetController);
router.post("/reset/newpassword", resetNewpasswordController);

// product route
router.post("/addproduct", checkLogin, avatarUpload, productController);
router.post("/product/search", searchProdctController);

module.exports = router;
