import {
  GET_DETAIL_TEMPLATE,
  GET_DETAIL_TEMPLATE_FAIL,
  GET_DETAIL_TEMPLATE_SUCCESS,
} from "../../constants/actions/project/getDetailTemplate";

export const initialState = {
  data: {},
  error: null,
  loading: false,
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_DETAIL_TEMPLATE:
      return {
        ...state,
        error: null,
        loading: true,
      };
    case GET_DETAIL_TEMPLATE_SUCCESS:
      return {
        ...state,
        data: action.data,
        error: null,
        loading: false,
      };
    case GET_DETAIL_TEMPLATE_FAIL:
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
