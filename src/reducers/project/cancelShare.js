import {
  CANCEL_SHARE,
  CANCEL_SHARE_FAIL,
  CANCEL_SHARE_SUCCESS,
} from "../../constants/actions/project/cancelShare";

export const initialState = {
  status: "",
  error: null,
  loading: false,
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case CANCEL_SHARE:
      return {
        ...state,
        error: null,
        loading: true,
      };
    case CANCEL_SHARE_SUCCESS:
      return {
        ...state,
        ...initialState,
        status: CANCEL_SHARE_SUCCESS,
        error: null,
        loading: false,
      };
    case CANCEL_SHARE_FAIL:
      return {
        ...state,
        ...initialState,
        status: CANCEL_SHARE_FAIL,
        error: action.error,
        loading: false,
      };
    default:
      return state;
  }
}

export default reducer;
