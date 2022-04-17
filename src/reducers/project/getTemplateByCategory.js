import {
  GET_TEMPLATE_BY_CATEGORY,
  GET_TEMPLATE_BY_CATEGORY_FAIL,
  GET_TEMPLATE_BY_CATEGORY_SUCCESS,
} from "../../constants/actions/project/getTemplateByCategory";

export const initialState = {
  data: {},
  error: null,
  loading: false,
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_TEMPLATE_BY_CATEGORY:
      return {
        ...state,
        error: null,
        loading: true,
      };
    case GET_TEMPLATE_BY_CATEGORY_SUCCESS:
      return {
        ...state,
        data: action.data,
        error: null,
        loading: false,
      };
    case GET_TEMPLATE_BY_CATEGORY_FAIL:
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
