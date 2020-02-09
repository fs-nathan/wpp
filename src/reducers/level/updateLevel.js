import {
  UPDATE_LEVEL,
  UPDATE_LEVEL_SUCCESS,
  UPDATE_LEVEL_FAIL,
} from '../../constants/actions/level/updateLevel';

export const initialState = {
  data: {
    level: null,
  },
  error: null,
  loading: false,
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case UPDATE_LEVEL:
      return {
        ...state,
        error: null,
        loading: true,
      };
    case UPDATE_LEVEL_SUCCESS: 
      return {
        ...state, 
        data: action.data,
        error: null,
        loading: false,
      };
    case UPDATE_LEVEL_FAIL:
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