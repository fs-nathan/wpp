import {
  SORT_USER,
  SORT_USER_SUCCESS,
  SORT_USER_FAIL,
} from '../../constants/actions/user/sortUser';

export const initialState = {
  data: {  
  },
  error: null,
  loading: false,
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case SORT_USER:
      return {
        ...state,
        error: null,
        loading: true,
      };
    case SORT_USER_SUCCESS: 
      return {
        ...state, 
        data: {},
        error: null,
        loading: false,
      };
    case SORT_USER_FAIL:
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