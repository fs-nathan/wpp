import {
  GET_BANNER,
  GET_BANNER_FAIL,
  GET_BANNER_SUCCESS,
} from "../../constants/actions/project/getBanner";

export const initialState = {
  data: {},
  error: null,
  loading: false,
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_BANNER:
      return {
        ...state,
        error: null,
        loading: true,
      };
    case GET_BANNER_SUCCESS:
      return {
        ...state,
        data: action.data,
        error: null,
        loading: false,
      };
    case GET_BANNER_FAIL:
      return {
        ...state,
        ...initialState,
        error: action.error,
        loading: false,
      };
    default:
      return state;
  }
}

export default reducer;
