import {
  GET_LIST_TEMPLATE_ME_SHARED,
  GET_LIST_TEMPLATE_ME_SHARED_FAIL,
  GET_LIST_TEMPLATE_ME_SHARED_SUCCESS,
} from "../../constants/actions/project/getListTemplateMeShared";

export const initialState = {
  data: {},
  error: null,
  loading: false,
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_LIST_TEMPLATE_ME_SHARED:
      return {
        ...state,
        error: null,
        loading: true,
      };
    case GET_LIST_TEMPLATE_ME_SHARED_SUCCESS:
      return {
        ...state,
        data: action.data,
        error: null,
        loading: false,
      };
    case GET_LIST_TEMPLATE_ME_SHARED_FAIL:
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
