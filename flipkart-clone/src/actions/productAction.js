import axios from "../helpers/axios";
import { productConstants } from "./constants";



export const getProductsBySlug = (slug) => {
  return async (dispatch) => {
    const res = await axios.get(`/products/${slug}`);
    if (res.status === 200) {
      dispatch({
        type: productConstants.GET_PRODUCTS_BY_SLUG,
        payload: res.data,
      });
    } else {
    }
  };
};
export const getProductsBySlug2 = (slug, keyword = "", currentPage = 1, price = [0, 25000], category, ratings = 0) => {
  return async (dispatch) => {
    let link = `/products/${slug}?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&ratings[gte]=${ratings}`;
    const res = await axios.get(link);
    if (res.status === 200) {
      dispatch({
        type: productConstants.GET_PRODUCTS_BY_SLUG,
        payload: res.data,
      });
    } else {
    }
  };
};

export const getProductsPage = (payload) => {
  return async (dispatch) => {
    try {
      const { cid, type } = payload.params;
      const res = await axios.get(`/page/${cid}/${type}`);
      dispatch({ type: productConstants.GET_PRODUCT_PAGE_REQUEST });
      if (res.status === 200) {
        const { page } = res.data;
        dispatch({
          type: productConstants.GET_PRODUCT_PAGE_SUCCESS,
          payload: { page },
        });
      } else {
        const { error } = res.data;
        dispatch({
          type: productConstants.GET_PRODUCT_PAGE_REQUEST,
          payload: { error },
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const getProductDetailsById = (payload) => {
  return async (dispatch) => {
    dispatch({ type: productConstants.GET_PRODUCT_DETAILS_BY_ID_REQUEST });
    let res;
    try {
      const { productId } = payload.params;
      res = await axios.get(`/product/${productId}`);
      console.log(res);
      dispatch({
        type: productConstants.GET_PRODUCT_DETAILS_BY_ID_SUCCESS,
        payload: { productDetails: res.data.product },
      });
    } catch (error) {
      console.log(error);
      dispatch({
        type: productConstants.GET_PRODUCT_DETAILS_BY_ID_FAILURE,
        payload: { error: res.data.error },
      });
    }
  };
};

// NEW REVIEW
// export const newReview = (formdata) => async (dispatch) => {
//   try {
//     dispatch({ type: productConstants.NEW_REVIEW_REQUEST });

//     const res = await axios.put(`/review`, formdata, );

//     dispatch({
//       type: productConstants.NEW_REVIEW_SUCCESS,
//       payload: res.data,
//     });
//   } catch (error) {
//     dispatch({
//       type: productConstants.NEW_REVIEW_FAIL,
//       payload: error.response.message,
//     });
//   }
// };

export const newReview = (formdata) => {
  return async (dispatch) => {
    try {
      dispatch({ type: productConstants.NEW_REVIEW_REQUEST });
      const res = await axios.put(`/review`, formdata);
      if (res.status === 200) {
        dispatch({
          type: productConstants.NEW_REVIEW_SUCCESS,
          payload: { reviews: res.data },
        });
      } else {
        dispatch({
          type: productConstants.NEW_REVIEW_FAIL,
          payload: { error: res.data.error },
        });
      }
    } catch (err) {
      console.log(err);
    }
  };
};



// Get All Reviews of a Product
export const getAllReviews = (id) => {
  return async (dispatch) => {
    try {
      dispatch({ type: productConstants.ALL_REVIEW_REQUEST });

      const { res } = await axios.get(`/reviews?id=${id}`);

      dispatch({
        type: productConstants.ALL_REVIEW_SUCCESS,
        payload: res.success,
      });
    } catch (error) {
      dispatch({
        type: productConstants.ALL_REVIEW_FAIL,
        payload: error.response.res.message,
      });
    }
  };
};

export const clearErrors = () => async (dispatch) => {
  dispatch({ type: productConstants.CLEAR_ERRORS });
};
