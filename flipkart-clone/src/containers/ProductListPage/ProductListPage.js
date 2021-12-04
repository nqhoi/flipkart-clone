import React from "react";
import Layout from "../../components/Layout/Layout";
import getParams from "../../utils/getParams";
import ClothingAndAccessories from "./ClothingAndAccessories/ClothingAndAccessories";
import ProductPage from "./ProductPage/ProductPage";
import ProductProduct from "./ProductProduct/ProductProduct";
import ProductStore from "./ProductStore/ProductStore";
// import "./ProductListPage.css";

const ProductListPage = (props) => {
  const renderProduct = () => {
    const params = getParams(props.location.search);
    console.log(params);
    let content = null;
    switch (params.type) {
      case "store":
        content = <ProductStore {...props} />;
        break;
      case "page":
        content = <ProductPage {...props} />;
        break;
      case "product":
        content = <ProductProduct {...props} />;
        break;
      default:
        content = <ClothingAndAccessories {...props} />;
    }

    return content;
  };

  return <Layout>{renderProduct()}</Layout>;
};

export default ProductListPage;
