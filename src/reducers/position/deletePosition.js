import {
  DELETE_POSITION,
  DELETE_POSITION_SUCCESS,
  DELETE_POSITION_FAIL,
} from '../../constants/actions/position/deletePosition';

export const initialState = {
  data: {},
  error: null,
  loading: false,
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case DELETE_POSITION:
      return {
        ...state,
        error: null,
        loading: true,
      };
    case DELETE_POSITION_SUCCESS: 
      return {
        ...state, 
        data: {},
        error: null,
        loading: false,
      };
    case DELETE_POSITION_FAIL:
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