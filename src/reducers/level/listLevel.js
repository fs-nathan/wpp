import {
  LIST_LEVEL,
  LIST_LEVEL_SUCCESS,
  LIST_LEVEL_FAIL,
} from '../../constants/actions/level/listLevel';

export const initialState = {
  data: {
    levels: [],  
  },
  error: null,
  loading: false,
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case LIST_LEVEL:
      return {
        ...state,
        error: null,
        loading: true,
      };
    case LIST_LEVEL_SUCCESS: 
      return {
        ...state, 
        data: action.data,
        error: null,
        loading: false,
      };
    case LIST_LEVEL_FAIL:
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