const router = require('express').Router()
const { requireSignin,  userMiddleware } = require("../common-middleware");
const { addItemToCart, getCartItems, removeCartItems } = require('../controller/cart');


router.post("/user/cart/addtocart", requireSignin, userMiddleware,  addItemToCart);
router.post("/user/getCartItems", requireSignin, userMiddleware,  getCartItems);
router.post("/user/cart/removeItem", requireSignin, userMiddleware,  removeCartItems);

module.exports = router;