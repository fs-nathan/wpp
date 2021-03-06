import { DELETE_ICON, DELETE_ICON_FAIL, DELETE_ICON_SUCCESS } from '../../constants/actions/icon/deleteIcon';

export const initialState = {
  data: {},
  error: null,
  loading: false,
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case DELETE_ICON:
      return {
        ...state,
        error: null,
        loading: true,
      };
    case DELETE_ICON_SUCCESS:
      return {
        ...state,
        ...initialState,
        data: action.data,
        error: null,
        loading: false,
      };
    case DELETE_ICON_FAIL:
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