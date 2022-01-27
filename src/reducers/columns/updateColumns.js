import {
  UPDATE_COLUMNS,
  UPDATE_COLUMNS_FAIL,
  UPDATE_COLUMNS_SUCCESS,
} from "../../constants/actions/columns/updateColumns";

export const initialState = {
  data: {
    columns: null,
  },
  error: null,
  loading: false,
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case UPDATE_COLUMNS:
      return {
        ...state,
        error: null,
        loading: true,
      };
    case UPDATE_COLUMNS_SUCCESS:
      return {
        ...state,
        ...initialState,
        data: action.data,
        error: null,
        loading: false,
      };
    case UPDATE_COLUMNS_FAIL:
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
