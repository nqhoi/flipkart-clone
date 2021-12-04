const router = require("express").Router();
const { requireSignin, adminMiddleware } = require("../../common-middleware");
const { UpdateOrder, getCustomerOrders } = require("../../controller/admin/orderAdmin");

router.post("/order/update", requireSignin, adminMiddleware, UpdateOrder);
router.post("/order/getCustomerOrders", requireSignin, adminMiddleware, getCustomerOrders);

module.exports = router;
