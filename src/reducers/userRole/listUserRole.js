import {
  LIST_USER_ROLE,
  LIST_USER_ROLE_SUCCESS,
  LIST_USER_ROLE_FAIL,
} from '../../constants/actions/userRole/listUserRole';

export const initialState = {
  data: {
    userRoles: [],  
  },
  error: null,
  loading: false,
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case LIST_USER_ROLE:
      return {
        ...state,
        error: null,
        loading: true,
      };
    case LIST_USER_ROLE_SUCCESS: 
      return {
        ...state, 
        data: action.data,
        error: null,
        loading: false,
      };
    case LIST_USER_ROLE_FAIL:
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