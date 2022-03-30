import { TOKEN } from "constants/constants";
import {
  LOGIN,
  LOGIN_CHECK_STATE,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
} from "../../constants/actions/authentications";

export const initialState = {
  data: {
    token: null,
    refreshToken: null,
    groupActive: null,
  },
  error: null,
  isAuthenticated: localStorage.getItem(TOKEN) ? true : false,
  loading: false,
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case LOGIN:
    case LOGIN_CHECK_STATE:
      return {
        ...state,
        error: null,
        loading: true,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        data: action.data,
        error: null,
        loading: false,
        isAuthenticated:true,
      };
    case LOGIN_FAIL:
      return {
        ...state,
        error: action.error,
        loading: false,
      };
    default:
      return state;
  }
}

export default reducer;
