import {
  USE_TEMPLATE,
  USE_TEMPLATE_FAIL,
  USE_TEMPLATE_RESET,
  USE_TEMPLATE_SUCCESS,
} from "../../constants/actions/project/useTemplate";

export const initialState = {
  error: null,
  loading: false,
  status: null,
  data: {
    project: null,
  },
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case USE_TEMPLATE:
      return {
        ...state,
        error: null,
        loading: true,
      };
    case USE_TEMPLATE_SUCCESS:
      return {
        ...state,
        ...initialState,
        status: USE_TEMPLATE_SUCCESS,
        data: action.data,
        error: null,
        loading: false,
      };
    case USE_TEMPLATE_FAIL:
      return {
        ...state,
        ...initialState,
        status: USE_TEMPLATE_FAIL,
        error: action.error,
        loading: false,
      };
    case USE_TEMPLATE_RESET:
      return {
        ...state,
        ...initialState,
      };
    default:
      return state;
  }
}

export default reducer;
