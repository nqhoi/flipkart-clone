const router = require("express").Router();
const { signup, signIn, signout } = require("../../controller/admin/auth");
const {
  validateSignupRequest,
  isRequestValidated,
  validateSigninRequest,
} = require("../../validators/auth");

router.post("/admin/signup", validateSignupRequest, isRequestValidated, signup);
router.post("/admin/signin", validateSigninRequest, isRequestValidated, signIn);
router.post("/admin/signout", signout);

module.exports = router;
