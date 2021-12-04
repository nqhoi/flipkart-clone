import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getProductsBySlug } from "../../../actions";
import { generatePublicUrl } from "../../../urlConfig";
import Card from "../../../components/UI/Card/Card";
import "./ProductStore.css";
import { MaterialButton } from "../../../components/MaterialUI/MaterialUI";
import Rating from "../../../components/UI/Rating";
import Price from "../../../components/UI/Price";

const ProductStore = (props) => {
  const dispatch = useDispatch();
  const product = useSelector((state) => state.product);
  const priceRange = product.priceRange;

  useEffect(() => {
    const { match } = props;
    dispatch(getProductsBySlug(match.params.slug));
  }, []);

  return (
    <>
      <div style={{padding: 8}}>
      {Object.keys(product.productsByPrice).map((key, index) => {
        return (
          <div style={{paddingBottom: 16}}>
          <Card
            headerLeft={`${props.match.params.slug} mobie under ${priceRange[key]}`}
            headerRight={
              <MaterialButton
                title={"VIEW ALL"}
                style={{
                  width: "96px",
                }}
                bgColor="#2874f0"
                fontSize="12px"
              />
            }
            style={{
              // width: "calc(100% - 40px)",
              // padding: "8px",
            }}
          >
            <div style={{ display: "flex" }}>
              {product.productsByPrice[key].map((product) => (
                <Link
                  to={`/${product.slug}/${product._id}/p`}
                  style={{
                    display: "block",
                    textDecoration: "none",
                    color: "#000",
                  }}
                  className="productConainer"
                >
                  <div className="prductImgContainer">
                    <img
                      src={generatePublicUrl(product.productPictures[0].img)}
                      alt=""
                    />
                  </div>
                  <div className="productInfo">
                    <div style={{ margin: "10px 0" }}>{product.name}</div>
                    <div>
                      <Rating value={product.ratings} />
                      &nbsp;&nbsp;
                      <span
                        style={{
                          color: "#777",
                          fontWeight: "500",
                          fontSize: "12px",
                        }}
                      >
                        ({product.numOfReviews})
                      </span>
                    </div>
                    <Price value={product.price} />
                  </div>
                </Link>
              ))}
            </div>
          </Card>
          </div>
        );
      })}
      </div>
    </>
  );
};

export default ProductStore;
