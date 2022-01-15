import {
  UPDATE_VALUE_COLUMNS,
  UPDATE_VALUE_COLUMNS_FAIL,
  UPDATE_VALUE_COLUMNS_SUCCESS,
} from "../../constants/actions/columns/updateValueColumns";

export const initialState = {
  data: {
    columns: null,
  },
  error: null,
  loading: false,
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case UPDATE_VALUE_COLUMNS:
      return {
        ...state,
        error: null,
        loading: true,
      };
    case UPDATE_VALUE_COLUMNS_SUCCESS:
      return {
        ...state,
        ...initialState,
        data: action.data,
        error: null,
        loading: false,
      };
    case UPDATE_VALUE_COLUMNS_FAIL:
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
