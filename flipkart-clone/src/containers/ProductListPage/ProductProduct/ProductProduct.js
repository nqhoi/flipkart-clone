import { Slider, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Col } from "react-bootstrap";
import { BiRupee } from "react-icons/bi";
import { IoIosArrowForward, IoIosStar } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getProductsBySlug } from "../../../actions";
import Card from "../../../components/UI/Card/Card";
import { generatePublicUrl } from "../../../urlConfig";
import "./ProductProduct.css";

const ProductProduct = (props) => {
  const product = useSelector((state) => state.product);
  const dispatch = useDispatch();
  const [sort, setSort] = useState("newest");
  const [price, setPrice] = useState([0, 50000]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [filters, setFilters] = useState({});
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const { match } = props;
    dispatch(getProductsBySlug(match.params.slug));
  }, []);

  useEffect(() => {
    setFilteredProducts(
      product.products.filter((item) =>
        Object.entries(filters).every(([key, value]) =>
          item[key].includes(value)
        )
      )
    );
  }, [product, filters]);

  // useEffect(() => {
  //   console.log(sort);
  //   if (sort === "newest") {
  //     product.products.sort((a, b) => a.createdAt - b.createdAt);
  //   } else if (sort === "asc") {
  //     product.products.sort((a, b) => a.price - b.price);
  //   } else {
  //     product.products.sort((a, b) => b.price - a.price);
  //   }
  // }, [product, sort]);

  useEffect(() => {
    if (sort === "newest") {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => b.createdAt - a.createdAt)
      );
    } else if (sort === "asc") {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => a.price - b.price)
      );
    } else {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => b.price - a.price)
      );
    }
  }, [sort]);

  useEffect(() => {
    product.products.filter((a) => a.price <= price[1]);
  }, [product, price]);

  const priceHandler = (event, newPrice) => {
    setPrice(newPrice);
    // console.log(newPrice);
  };

  // const indexOfLastPost = currentPage * postsPerPage;
  // const indexOfFirstPost = indexOfLastPost - postsPerPage;
  // const currentPosts = product.products.slice(indexOfFirstPost, indexOfLastPost);
  // console.log(currentPosts);

  // const paginate = (pageNumber) => {
  //   setCurrentPage(pageNumber);
  // };

  return (
    <div style={{ padding: "10px", display: "flex", backgroundColor: "" }}>
      <div className="filterBox">
        <Typography>Price</Typography>
        <Slider
          // getAriaLabel={() => "Temperature range"}
          size="small"
          value={price}
          onChange={priceHandler}
          valueLabelDisplay="auto"
          // aria-label="Temperature"
          // step={5000}
          // marks
          min={0}
          max={50000}
        />
      </div>
      <div className="content">
        <div className="content__header">
          <div className="breed">
            <ul>
              <li>
                {" "}
                <a href="#!">Home</a>
                <IoIosArrowForward />
              </li>
              <li>
                <a href="#!">Mobiles</a>
                <IoIosArrowForward />
              </li>
              <li>
                <a href="#!">Realme</a>
                <IoIosArrowForward />
              </li>
              <li>{/* <a href="#">{product.category}</a> */}</li>
            </ul>
          </div>
          {/* <div
              className="header__filter"
              value={sort}
              onChange={(e) => setSort(e.target.value)}
            >
              <span className="">Sort By</span>
              <div>Popularity</div>
              <div value="asc">Price -- Low to High</div>
              <div value="desc">Price -- High to Low</div>
              <div value="newest">Newest First</div>
            </div> */}
          <div className="header__filter">
            <span>Sort By</span>
            <select
              className="form-control"
              onChange={(e) => setSort(e.target.value)}
            >
              <option value="newest">Newest</option>
              <option value="asc">Price (asc)</option>
              <option value="desc">Price (desc)</option>
            </select>
          </div>
        </div>
        <Card
          style={{
            boxSizing: "border-box",
            padding: "24px",
            display: "flex",
            flexDirection: "row"

          }}
        >
          {filteredProducts.map((product, index) => (
            <div className="ppContainer" key={index}>
              <Link
                className="ppImgContainer"
                to={`/${product.slug}/${product._id}/p`}
              >
                <img
                  src={generatePublicUrl(product.productPictures[0].img)}
                  alt=""
                />
              </Link>
              <div>
                <div className="ppProductName">{product.name}</div>
                <div className="ppProductPrice">
                  <BiRupee />
                  {product.price}
                </div>
                <div className="ppProductSize"> 
                  <span>size: </span>
                  {product.size}
                </div>
              </div>
            </div>
          ))}
        </Card>
        <div className="paginationBox">
          {/* <Pagination
              postsPerPage={postsPerPage}
              totalPosts={product.products.length}
              paginate={paginate}
            /> */}
        </div>
      </div>
    </div>
  );
};

export default ProductProduct;
