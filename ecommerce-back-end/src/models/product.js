const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    ratings: {
      type: Number,
      default: 0,
    },
    size: { type: Array },
    color: { type: Array },
    price: {
      type: Number,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    offer: { type: Number },
    productPictures: [{ img: { type: String } }],
    numOfReviews: {
      type: Number,
      default: 0,
    },
    // pRatingsReviews: [
    //   {
    //     review: String,
    //     user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    //     rating: String,
    //     createdAt: {
    //       type: Date,
    //       default: Date.now(),
    //     },
    //   },
    // ],
    reviews: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
          required: true,
        },
        name: {
          type: String,
          ref: "User",
          required: true,
        },
        rating: {
          type: Number,
          required: true,
        },
        comment: {
          type: String,
          required: true,
        },
        createdAt: {
          type: Date,
          default: Date.now(),
        },
      },
    ],
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    updatedAt: Date,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
