const router = require("express").Router();
const { requireSignin, upload, adminMiddleware } = require("../../common-middleware");
const { createPage, getPage } = require("../../controller/admin/Page");


router.post("/page/create", requireSignin, adminMiddleware,  upload.fields([
    {name: 'banners'},
    {name: 'products'}
]), createPage);
router.get('/page/:category/:type', getPage)

module.exports = router;
