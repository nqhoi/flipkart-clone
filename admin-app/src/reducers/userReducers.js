import { userContants } from "../actions/constants";

const initialState = {
  token: null,
  user: {
    error: null,
    message: "",
    loading: false,
  },
  authenticate: false,
  authenticating: false,
};

const userReduer = (state = initialState, action) => {
  console.log(action);
  switch (action.type) {
    case userContants.USER_REGISTER_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;
    case userContants.USER_REGISTER_SUCCESS:
      state = {
        ...state,
        loading: false,
        message: action.payload.message,
      };
      break;
    case userContants.USER_REGISTER_FAILURE:
      state = {
        ...state,
        loading: false,
        error: action.payload.error,
      };
      break;
    default:
      break;
  }
  return state;
};

export default userReduer;
