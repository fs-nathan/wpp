import {
  DELETE_ICON,
  DELETE_ICON_SUCCESS,
  DELETE_ICON_FAIL,
} from '../../constants/actions/icon/deleteIcon';

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
        data: action.data,
        error: null,
        loading: false,
      };
    case DELETE_ICON_FAIL:
      return {
        ...state,
        error: action.error,
        loading: false,
      };
    default:
      return state;
  }
}

export default reducer;