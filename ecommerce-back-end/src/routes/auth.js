const router = require("express").Router();
const { signup, signIn } = require("../controller/auth");
const { validateSignupRequest, validateSigninRequest, isRequestValidated } = require("../validators/auth");

router.post("/signup", validateSignupRequest, isRequestValidated, signup);
router.post("/signin", validateSigninRequest,isRequestValidated, signIn);

module.exports = router;
