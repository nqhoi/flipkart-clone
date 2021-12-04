const router = require("express").Router();
const { requireSignin, adminMiddleware } = require("../common-middleware");
const { createProduct, getProductsBySlug, getProductDetailsById, getProducts, deleteProductById,  getProductReviews, createProductReview, getProductsBySlug2,  } = require("../controller/product");
const multer = require('multer');
const shortid = require('shortid')
const path = require('path');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(path.dirname(__dirname), 'uploads')) 
    },
    filename: function (req, file, cb) {
      cb(null, shortid.generate() + '-' + file.originalname)
    }
  })

const upload = multer({ storage  })
  
  
router.post("/product/create", requireSignin, adminMiddleware, upload.array('productPicture') , createProduct);
router.get("/products/:slug", getProductsBySlug)
router.get('/product/:productId', getProductDetailsById)
router.delete('/product/deleteProductById', requireSignin, adminMiddleware, deleteProductById)
router.post('/product/getProducts', requireSignin, adminMiddleware, getProducts)
router.put('/review', requireSignin, createProductReview)
router.get('/reviews', getProductReviews)

module.exports = router;
