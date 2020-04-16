import { SEARCH_USER, SEARCH_USER_FAIL, SEARCH_USER_RESET, SEARCH_USER_SUCCESS } from '../../constants/actions/groupUser/searchUser';

export const initialState = {
  data: {
    member: null,
  },
  error: null,
  loading: false,
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case SEARCH_USER:
      return {
        ...state,
        error: null,
        loading: action.quite === false ? true : false,
      };
    case SEARCH_USER_SUCCESS:
      return {
        ...state,
        ...initialState,
        data: action.data,
        error: null,
        loading: false,
      };
    case SEARCH_USER_FAIL:
      return {
        ...state,
        ...initialState,
        error: action.error,
        loading: false,
      };
    case SEARCH_USER_RESET:
      return {
        ...state,
        ...initialState,
      }
    default:
      return state;
  }
}

export default reducer;