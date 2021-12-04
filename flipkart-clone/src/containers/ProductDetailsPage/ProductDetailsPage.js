import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Rating,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { AiFillThunderbolt } from "react-icons/ai";
import { BiRupee } from "react-icons/bi";
import { IoIosArrowForward, IoIosStar, IoMdCart } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  clearErrors,
  getProductDetailsById,
  newReview,
} from "../../actions";
import { productConstants } from "../../actions/constants";
import Layout from "../../components/Layout/Layout";
import { MaterialButton } from "../../components/MaterialUI/MaterialUI";
import { generatePublicUrl } from "../../urlConfig";
import "./ProductDetailsPage.css";
import ReviewCard from "./ReviewCard/ReviewCard";

const ProductDetailsPage = (props) => {
  const dispatch = useDispatch();
  const product = useSelector((state) => state.product);
  const error = useSelector((state) => state.product.productDetails);
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const { success } = useSelector((state) => state.product.productDetails);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (error) {
      // alert.error(error);
      dispatch(clearErrors());
    }

    if (success) {
      alert.success("Review Submitted Successfully");
      dispatch({ type: productConstants.NEW_REVIEW_RESET });
    }

    const { productId } = props.match.params;
    console.log(props);
    const payload = {
      params: {
        productId,
      },
    };

    dispatch(getProductDetailsById(payload));
  }, [dispatch]);

  useEffect(() => {
    let images = [];

    product.productDetails.productPictures &&
      product.productDetails.productPictures.map((item) =>
        images.push({
          original: `generatePublicUrl(item.img)`,
          thumbnail: `generatePublicUrl(item.img)`,
        })
      );
  }, []);

  if (Object.keys(product.productDetails).length === 0) {
    return null;
  }

  const reviewSubmitHandler = () => {
    const { productId } = props.match.params;
    // console.log({productId});
    const myForm = new FormData();

    myForm.set("rating", rating);
    myForm.set("comment", comment);
    myForm.set("productId", productId);

    dispatch(newReview(myForm));

    setOpen(false);
  };

  const submitReviewToggle = () => {
    open ? setOpen(false) : setOpen(true);
  };

  // const options = {
  // size: "small",
  //   value: 4,
  //   readOnly: true,
  //   precision: 0.5,
  // };

  const changeImage = (a) => {
    // console.log(index);
    // console.log(a);
    const b = document.getElementsByClassName("thumbnail")[a];
    const c = document.getElementsByClassName("thumbnail")[index];
    b.classList.add("active");
    c.classList.remove("active");
    if (a === index) {
      b.classList.add("active");
    }
    setIndex(a);
  };

  return (
    <Layout>
      {/* <div>{product.productDetails.name}</div> */}
      <div className="productDescriptionContainer">
        <div className="productDescriptionContainer-wrap">
          <div className="flexRow">
            <div className="verticalImageStack">
              {product.productDetails.productPictures.map((thumb, a) => (
                <div 
                  onClick={() => changeImage(a)}
                  className="thumbnail"
                  key={a}
                >
                  <img src={generatePublicUrl(thumb.img)} alt={thumb.img} />
                </div>
              ))}
              {/* <div className="thumbnail active">
              {product.productDetails.productPictures.map((thumb, index) => (
                <img src={generatePublicUrl(thumb.img)} alt={thumb.img} />
              ))}
            </div> */}
            </div>
            <div className="productDescContainer">
              <div className="productDescImgContainer">
                <img
                  src={generatePublicUrl(
                    product.productDetails.productPictures[index].img
                  )}
                  alt={`${product.productDetails.productPictures[index].img}`}
                />
                {/* <Carousel >
                  {product.productDetails.productPictures.map((item, index) => (
                      <img src={generatePublicUrl(item.img)} alt="" />
                    
                  ))}
                </Carousel> */}
              </div>

              {/* action buttons */}
              <div className="flexRow">
                <MaterialButton
                  title="ADD TO CART"
                  bgColor="#ff9f00"
                  textColor="#ffffff"
                  style={{
                    marginRight: "5px",
                  }}
                  icon={<IoMdCart />}
                  onClick={() => {
                    const { _id, name, price } = product.productDetails;
                    const img = product.productDetails.productPictures[0].img;
                    dispatch(addToCart({ _id, name, price, img }));
                    // props.history.push("/cart");
                  }}
                />
                <MaterialButton
                  title="BUY NOW"
                  bgColor="#fb641b"
                  textColor="#ffffff"
                  style={{
                    marginLeft: "5px",
                  }}
                  icon={<AiFillThunderbolt />}
                />
              </div>
            </div>
          </div>
          <div>
            {/* home > category > subCategory > productName */}
            <div className="breed">
              <ul>
                <li>
                  {" "}
                  <a href="#">Home</a>
                  <IoIosArrowForward />
                </li>
                <li>
                  <a href="#">Mobiles</a>
                  <IoIosArrowForward />
                </li>
                <li>
                  <a href="#">Samsung</a>
                  <IoIosArrowForward />
                </li>
                <li>
                  <a href="#">{product.productDetails.name}</a>
                </li>
              </ul>
            </div>

            {/* product description */}
            <div className="productDetails">
              <p className="productTitle">{product.productDetails.name}</p>
              <div>
                <span className="ratingCount">
                  {product.productDetails.ratings} <IoIosStar />
                  {/* <Rating {...options} /> */}
                </span>
                <span className="ratingNumbersReviews">
                  72,234 Ratings & {product.productDetails.numOfReviews} Reviews
                </span>
              </div>
              <div className="extraOffer">
                Extra <BiRupee />
                4500 off{" "}
              </div>
              <div className="flexRow priceContainer">
                <span className="price">
                  <BiRupee />
                  {product.productDetails.price}
                </span>
                <span className="discount" style={{ margin: "0 10px" }}>
                  22% off
                </span>
                {/* <span>i</span> */}
              </div>
              <div>
                <p
                  style={{
                    color: "#212121",
                    fontSize: "14px",
                    fontWeight: "600",
                  }}
                >
                  Available Offers
                </p>
                {product.productDetails.size.length> 0? 
                <div className='size flexRow'>
                  <span>size: </span>
                  <ul>
                    <li>{product.productDetails.size}</li>
                  </ul>
                </div> : ''}
              
                <p style={{ display: "flex" }}>
                  <span
                    style={{
                      width: "100px",
                      fontSize: "12px",
                      color: "#878787",
                      fontWeight: "600",
                      marginRight: "20px",
                    }}
                  >
                    Description
                  </span>
                  <span
                    style={{
                      fontSize: "12px",
                      color: "#212121",
                    }}
                  >
                    {product.productDetails.description}
                  </span>
                </p>
                <button onClick={submitReviewToggle} className="submitReview">
                  Submit Review
                </button>
              </div>
            </div>
            {/* Review */}
            <div>
              <h3 className="reviewsHeading">REVIEWS</h3>
              <Dialog
                aria-labelledby="simple-dialog-title"
                open={open}
                onClose={submitReviewToggle}
              >
                <DialogTitle>Submit Review</DialogTitle>
                <DialogContent className="submitDialog">
                  <Rating
                    onChange={(e) => setRating(e.target.value)}
                    value={rating}
                    size="large"
                  />

                  <textarea
                    className="submitDialogTextArea"
                    cols="30"
                    rows="5"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                  ></textarea>
                </DialogContent>
                <DialogActions>
                  <Button onClick={submitReviewToggle} color="secondary">
                    Cancel
                  </Button>
                  <Button onClick={reviewSubmitHandler} color="primary">
                    Submit
                  </Button>
                </DialogActions>
              </Dialog>

              {/* {product.productDetails.reviews.map((review) => (
              <>
              <span>{review.user}</span>
              <span>{review.comment}</span>
              </> 
            ))} */}

              {product.productDetails.reviews &&
              product.productDetails.reviews[0] ? (
                <div className="reviews">
                  {product.productDetails.reviews &&
                    product.productDetails.reviews.map((review) => (
                      <ReviewCard key={review._id} review={review} />
                    ))}
                </div>
              ) : (
                <p className="noReviews">No Reviews Yet</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetailsPage;
