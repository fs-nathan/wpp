import {
  LOGIN,
  LOGIN_CHECK_STATE,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
} from '../../constants/actions/authentications';

export const initialState = {
  data: {
    token: null,
    refreshToken: null,
    groupActive: null,  
  },
  error: null,
  loading: false,
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case LOGIN:
    case LOGIN_CHECK_STATE:
      return {
        ...state,
        error: null,
        loading: true,
      };
    case LOGIN_SUCCESS: 
      return {
        ...state, 
        data: action.data,
        error: null,
        loading: false,
      };
    case LOGIN_FAIL:
      return {
        ...state,
        error: null,
        loading: false,
      };
    default:
      return state;
  }
}

export default reducer;