import {
  DETAIL_USER,
  DETAIL_USER_SUCCESS,
  DETAIL_USER_FAIL,
} from '../../constants/actions/user/detailUser';

export const initialState = {
  data: {  
    user: null,
  },
  error: null,
  loading: false,
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case DETAIL_USER:
      return {
        ...state,
        error: null,
        loading: true,
      };
    case DETAIL_USER_SUCCESS: 
      return {
        ...state, 
        data: action.data,
        error: null,
        loading: false,
      };
    case DETAIL_USER_FAIL:
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