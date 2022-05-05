import {
  GET_LIST_TEMPLATE,
  GET_LIST_TEMPLATE_FAIL,
  GET_LIST_TEMPLATE_SUCCESS,
} from "../../constants/actions/project/getListTemplate";

export const initialState = {
  data: {},
  error: null,
  loading: false,
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_LIST_TEMPLATE:
      return {
        ...state,
        error: null,
        loading: true,
      };
    case GET_LIST_TEMPLATE_SUCCESS:
      return {
        ...state,
        data: action.data,
        error: null,
        loading: false,
      };
    case GET_LIST_TEMPLATE_FAIL:
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
