import {
  CREATE_COLUMNS,
  CREATE_COLUMNS_FAIL,
  CREATE_COLUMNS_SUCCESS,
} from "../../constants/actions/columns/createColumns";

export const initialState = {
  data: {
    columns: null,
  },
  error: null,
  loading: false,
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case CREATE_COLUMNS:
      return {
        ...state,
        error: null,
        loading: true,
      };
    case CREATE_COLUMNS_SUCCESS:
      return {
        ...state,
        ...initialState,
        data: action.data,
        error: null,
        loading: false,
      };
    case CREATE_COLUMNS_FAIL:
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
