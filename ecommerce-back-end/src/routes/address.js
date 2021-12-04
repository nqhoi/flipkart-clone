const router = require("express").Router();
const { requireSignin, userMiddleware } = require("../common-middleware");
const { addAddress, getAddress } = require("../controller/address");

router.post("/user/address/create", requireSignin, userMiddleware, addAddress);
router.post("/user/getaddress", requireSignin, userMiddleware, getAddress);

module.exports = router;
