import {
  USE_TEMPLATE,
  USE_TEMPLATE_FAIL,
  USE_TEMPLATE_SUCCESS,
} from "../../constants/actions/project/useTemplate";

export const initialState = {
  error: null,
  loading: false,
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
        data: action.data,
        error: null,
        loading: false,
      };
    case USE_TEMPLATE_FAIL:
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
