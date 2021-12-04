import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { isUserLoggedIn, updateCart } from "./actions";
import "./App.css";
import { CartPage } from "./containers/CartPage/CartPage";
import CheckoutPage from "./containers/CheckoutPage/CheckoutPage";
import HomePage from "./containers/HomePage/HomePage";
import OrderDetailsPage from "./containers/OrderDetailsPage/OrderDetailsPage";
import OrderPage from "./containers/OrderPage/OrderPage";
import ProductDetailsPage from "./containers/ProductDetailsPage/ProductDetailsPage";
import ProductListPage from "./containers/ProductListPage/ProductListPage";

function App() {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  useEffect(()=> {
    if(!auth.authenticate){
      dispatch(isUserLoggedIn())
    }
  }, [auth.authenticate])

  useEffect(() => {
    dispatch(updateCart())
  }, [auth.authenticate])

  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/" exact component={HomePage} />
          <Route path="/cart"  component={CartPage} />
          <Route path="/checkout"  component={CheckoutPage} />
          <Route path="/account/orders"  component={OrderPage} />
          <Route path="/order_details/:orderId"  component={OrderDetailsPage} />
          <Route path="/:productSlug/:productId/p"  component={ProductDetailsPage} />
          <Route path="/:slug"  component={ProductListPage} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
