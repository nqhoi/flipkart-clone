const Product = require("../models/product");
const shortId = require("shortid");
const slugify = require("slugify");
const Category = require("../models/category");
const APIfeatures = require("../utils/apifeatures");

exports.createProduct = (req, res) => {
  // res.status(200).json({file: req.files, body: req.body})

  const { name, price, color, size, description, category, quantity, createdBy } = req.body;

  let productPictures = [];

  if (req.files.length > 0) {
    productPictures = req.files.map((file) => {
      return { img: file.filename };
    });
  }

  const product = new Product({
    name: name,
    slug: slugify(name),
    price,
    color,
     size,
    quantity,
    description,
    productPictures,
    category,
    createdBy: req.user._id,
  });

  product.save((error, product) => {
    if (error) return res.status(400).json({ error });
    if (product) {
      res.status(201).json({ product, files: req.files });
    }
  });
};

exports.getProductsBySlug = (req, res) => {
  // const resultPerPage = 8;
  // const productsCount = await Product.countDocuments();

  // apiFeature.pagination(resultPerPage);

  const { slug } = req.params;
  Category.findOne({ slug: slug })
    .select("_id type")
    .exec((error, category) => {
      if (error) return res.status(400).json({ error });

      if (category) {
        Product.find({ category: category._id }).exec((error, products) => {
          if (error) return res.status(400).json({ error });

          if (category.type) {
            if (products.length > 0) {
              res.status(200).json({
                products,
                priceRange: {
                  under5k: 5000,
                  under10k: 10000,
                  under15k: 15000,
                  under20k: 20000,
                  under30k: 30000,
                },
                productsByPrice: {
                  under5k: products.filter((product) => product.price <= 5000),
                  under10k: products.filter(
                    (product) => product.price > 5000 && product.price <= 10000
                  ),
                  under15k: products.filter(
                    (product) => product.price > 10000 && product.price <= 15000
                  ),
                  under20k: products.filter(
                    (product) => product.price > 15000 && product.price <= 20000
                  ),
                  under30k: products.filter(
                    (product) => product.price > 20000 && product.price <= 30000
                  ),
                },
              });
            }
          } else {
            res.status(200).json({ products });
          }
        });
      }
    });
};

exports.getProductsBySlug2 = async(req, res) => {
  const resultPerPage = 8;
  const productsCount = await Product.countDocuments();


  const { slug } = req.params;
  Category.findOne({ slug: slug })
    .select("_id type")
    .exec(async(error, category) => {
      if (error) return res.status(400).json({ error });

      if (category) {
        const apiFeature = new APIfeatures(Product.find({ category: category._id }).exec((error, products) => {
          if (error) return res.status(400).json({ error });

          if (category.type) {
            if (products.length > 0) {
              res.status(200).json({
                products,
                priceRange: {
                  under5k: 5000,
                  under10k: 10000,
                  under15k: 15000,
                  under20k: 20000,
                  under30k: 30000,
                },
                productsByPrice: {
                  under5k: products.filter((product) => product.price <= 5000),
                  under10k: products.filter(
                    (product) => product.price > 5000 && product.price <= 10000
                  ),
                  under15k: products.filter(
                    (product) => product.price > 10000 && product.price <= 15000
                  ),
                  under20k: products.filter(
                    (product) => product.price > 15000 && product.price <= 20000
                  ),
                  under30k: products.filter(
                    (product) => product.price > 20000 && product.price <= 30000
                  ),
                },
              });
            }
          } else {
            res.status(200).json({ products });
          }
        })).search().filter()

        let products = await apiFeature.query;
        let filteredProductsCount = products.length;

        apiFeature.pagination(resultPerPage);
        products = await apiFeature.query;
      }
    });
};

exports.getProductDetailsById = (req, res) => {
  const { productId } = req.params;
  if (productId) {
    Product.findOne({ _id: productId }).exec((error, product) => {
      if (error) return res.status(400).json({ error });
      if (product) {
        res.status(200).json({ product });
      }
    });
  } else {
    return res.status(400).json({ error: "Params required" });
  }
};

exports.deleteProductById = (req, res) => {
  console.log({ body: req.body });
  const { productId } = req.body.payload;
  if (productId) {
    Product.deleteOne({ _id: productId }).exec((error, result) => {
      if (error) return res.status(400).json({ error });
      if (result) {
        res.status(202).json({ result });
      }
    });
  } else {
    res.status(400).json({ error: "Params required" });
  }
};

exports.getProducts = async (req, res) => {
  const products = await Product.find({ createdBy: req.user._id })
    .select(
      "_id name price color size quantity slug description productPictures category"
    )
    .populate({ path: "category", select: "_id name" })
    .exec();

  res.status(200).json({ products });
};


// Create New Review or Update the review
exports.createProductReview = async (req, res) => {
  const { rating, comment, productId } = req.body;

  const review = {
    user: req.user._id,
    name: req.user.lastName,
    rating: Number(rating),
    comment,
  };
  // console.log(user)

  const product = await Product.findById(productId);

  const isReviewed = product.reviews.find(
    (rev) => rev.user.toString() === req.user._id.toString()
  );

  if (isReviewed) {
    product.reviews.forEach((rev) => {
      if (rev.user.toString() === req.user._id.toString())
        (rev.rating = rating), (rev.comment = comment);
    });
  } else {
    product.reviews.push(review);
    product.numOfReviews = product.reviews.length;
  }

  let avg = 0;

  product.reviews.forEach((rev) => {
    avg += rev.rating;
  });

  product.ratings = avg / product.reviews.length;

  await product.save({ validateBeforeSave: false });

  res.status(200).json({
    success: true,
  });
};

// exports.addReview = async (req, res) => {
//   const product = await Product.findById(req.params.id);
//   if (product) {
//     const review = {
//       name: req.body.name,
//       rating: Number(req.body.rating),
//       comment: req.body.comment,
//     };
//     product.reviews.push(review);
//     product.numReviews = product.reviews.length;
//     product.rating =
//       product.reviews.reduce((a, c) => c.rating + a, 0) /
//       product.reviews.length;
//     const updatedProduct = await product.save();
//     res.status(201).send({
//       data: updatedProduct.reviews[updatedProduct.reviews.length - 1],
//       message: 'Review saved successfully.',
//     });
//   } else {
//     res.status(404).send({ message: 'Product Not Found' });
//   }
// };

// exports.postAddReview = async (req, res) => {
//   let { productId, uId, rating, review } = req.body;
//   if (!rating || !review  ) {
//     return res.json({ error: "All filled must be required" });
//   } else {
//     let checkReviewRatingExists = await Product.findOne({ _id: productId });
//     if (checkReviewRatingExists.pRatingsReviews.length > 0) {
//       checkReviewRatingExists.pRatingsReviews.map((item) => {
//         if (item.user === uId) {
//           return res.json({ error: "Your already reviewd the product" });
//         } else {
//           try {
//             let newRatingReview = Product.findByIdAndUpdate(productId, {
//               $push: {
//                 pRatingsReviews: {
//                   review: review,
//                   user: uId,
//                   rating: rating,
//                 },
//               },
//             });
//             newRatingReview.exec((err, result) => {
//               if (err) {
//                 console.log(err);
//               }
//               return res.json({ success: "Thanks for your review" });
//             });
//           } catch (err) {
//             return res.json({ error: "Cart product wrong" });
//           }
//         }
//       });
//     } else {
//       try {
//         let newRatingReview = Product.findByIdAndUpdate(productId, {
//           $push: {
//             pRatingsReviews: { review: review, user: uId, rating: rating },
//           },
//         });
//         newRatingReview.exec((err, result) => {
//           if (err) {
//             console.log(err);
//           }
//           return res.json({ success: "Thanks for your review" });
//         });
//       } catch (err) {
//         return res.json({ error: "Cart product wrong" });
//       }
//     }
//   }
// };

// Get All Reviews of a product
exports.getProductReviews = async (req, res) => {
  const { productId } = req.body;
  const product = await Product.findById(productId);

  if (!product) {
    return res.status(400).json({ msg: "Err" });
  }

  res.status(200).json({
    success: true,
    reviews: product.reviews,
  });
};
