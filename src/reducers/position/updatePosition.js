import {
  UPDATE_POSITION,
  UPDATE_POSITION_SUCCESS,
  UPDATE_POSITION_FAIL,
} from '../../constants/actions/position/updatePosition';

export const initialState = {
  data: {
    position: null,
  },
  error: null,
  loading: false,
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case UPDATE_POSITION:
      return {
        ...state,
        error: null,
        loading: true,
      };
    case UPDATE_POSITION_SUCCESS: 
      return {
        ...state, 
        data: action.data,
        error: null,
        loading: false,
      };
    case UPDATE_POSITION_FAIL:
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