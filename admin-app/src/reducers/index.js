import { combineReducers } from "redux";
import authReducer from "./authReducers";
import categoryReducer from "./categoryReducers";
import productReducer from "./productReducers";
import userReduer from "./userReducers";
import pageReducer from "./pageReducers";
import orderReducer from "./orderReducers";

const rootReducer = combineReducers({
  auth: authReducer,
  user: userReduer,
  category: categoryReducer,
  product: productReducer,
  page: pageReducer,
  order: orderReducer,
});

export default rootReducer;
