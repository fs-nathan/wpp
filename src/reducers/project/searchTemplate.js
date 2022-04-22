import {
  SEARCH_TEMPLATE,
  SEARCH_TEMPLATE_FAIL,
  SEARCH_TEMPLATE_RESET,
  SEARCH_TEMPLATE_SUCCESS,
} from "../../constants/actions/project/searchTemplate";

export const initialState = {
  data: {},
  error: null,
  loading: false,
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case SEARCH_TEMPLATE:
      return {
        ...state,
        error: null,
        loading: true,
      };
    case SEARCH_TEMPLATE_SUCCESS:
      return {
        ...state,
        data: action.data,
        error: null,
        loading: false,
      };
    case SEARCH_TEMPLATE_FAIL:
      return {
        ...state,
        error: action.error,
        loading: false,
      };
    case SEARCH_TEMPLATE_RESET:
      return {
        ...state,
        ...initialState,
      };
    default:
      return state;
  }
}

export default reducer;
