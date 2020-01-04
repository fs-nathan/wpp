import {
  UPDATE_USER_ROLE,
  UPDATE_USER_ROLE_SUCCESS,
  UPDATE_USER_ROLE_FAIL,
} from '../../constants/actions/userRole/updateUserRole';

export const initialState = {
  data: {
    userRole: null
  },
  error: null,
  loading: false,
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case UPDATE_USER_ROLE:
      return {
        ...state,
        error: null,
        loading: true,
      };
    case UPDATE_USER_ROLE_SUCCESS: 
      return {
        ...state, 
        data: action.data,
        error: null,
        loading: false,
      };
    case UPDATE_USER_ROLE_FAIL:
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