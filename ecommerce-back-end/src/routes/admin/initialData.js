const { requireSignin, adminMiddleware } = require("../../common-middleware");
const { initialData } = require("../../controller/admin/initialData");
const router = require("express").Router();

router.post("/initialData", requireSignin, adminMiddleware, initialData);

module.exports = router;
