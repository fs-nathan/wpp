import {
  GET_LIST_COLUMNS,
  GET_LIST_COLUMNS_FAIL,
  GET_LIST_COLUMNS_RESET,
  GET_LIST_COLUMNS_SUCCESS,
} from "../../constants/actions/columns/listColumns";

export const initialState = {
  data: {
    tasks: [],
  },
  error: null,
  loading: false,
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_LIST_COLUMNS:
      return {
        ...state,
        error: null,
        loading: action.quite ? false : true,
      };
    case GET_LIST_COLUMNS_SUCCESS:
      return {
        ...state,
        data: action.data,
        error: null,
        loading: false,
        firstTime: false,
      };

    case GET_LIST_COLUMNS_FAIL:
      return {
        ...state,
        error: action.error,
        loading: false,
        firstTime: false,
      };
    case GET_LIST_COLUMNS_RESET:
      return initialState;

    default:
      return state;
  }
}

export default reducer;
