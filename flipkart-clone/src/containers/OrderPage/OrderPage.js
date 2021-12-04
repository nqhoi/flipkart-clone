import React, { useEffect } from "react";
import { IoIosArrowForward } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { getOrders } from "../../actions";
import Layout from "../../components/Layout/Layout";
import { Breed } from "../../components/MaterialUI/MaterialUI";
import Card from "../../components/UI/Card/Card";
import { generatePublicUrl } from "../../urlConfig";
import { Link } from "react-router-dom";
import { BiRupee } from "react-icons/bi";
import "./OrderPage.css";

const OrderPage = (props) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(getOrders());
  }, []);

  return (
    <Layout>
      <div style={{ maxWidth: "1160px", margin: "5px auto" }}>
        <Breed
          breed={[
            { name: "Home", href: "/" },
            { name: "My Acount", href: "/account" },
            { name: "My Orders", href: "/account/orders" },
          ]}
          breedIcon={<IoIosArrowForward />}
        />
        {user.orders.map((order) => {
          return order.items.map((item) => (
            <Card
              key={item._id}
              style={{ display: "block", margin: "5px auto" }}
            >
              <Link
                to={`/order_details/${order._id}`}
                className="orderItemContainer"
              >
                <div className="orderImgContainer">
                  <img
                    className="orderImg"
                    src={generatePublicUrl(
                      item.productId?.productPictures[0].img
                    )}
                    alt=""
                  />
                </div>
                <div className="orderRow">
                  <div className="orderName">{item.productId?.name}</div>
                  <div className="orderPrice">
                    <BiRupee />
                    {item.payablePrice}
                  </div>
                  <div>{order.paymentStatus}</div>
                </div>
              </Link>
            </Card>
          ));
        })}
      </div>
    </Layout>
  );
};

export default OrderPage;
