import { DETAIL_USER, DETAIL_USER_FAIL, DETAIL_USER_SUCCESS } from '../../constants/actions/user/detailUser';

export const initialState = {
  data: {
    user: null,
  },
  error: null,
  loading: false,
  firstTime: true,
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case DETAIL_USER:
      return {
        ...state,
        error: null,
        loading: action.quite ? false : true,
      };
    case DETAIL_USER_SUCCESS:
      return {
        ...state,
        data: action.data,
        error: null,
        loading: false,
        firstTime: false,
      };
    case DETAIL_USER_FAIL:
      return {
        ...state,
        error: action.error,
        loading: false,
        firstTime: false,
      };
    default:
      return state;
  }
}

export default reducer;