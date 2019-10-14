import {
  CREATE_USER_ROLE,
  CREATE_USER_ROLE_SUCCESS,
  CREATE_USER_ROLE_FAIL,
} from '../../constants/actions/userRole/createUserRole';

export const initialState = {
  data: {
    userRoleId: null,  
  },
  error: null,
  loading: false,
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case CREATE_USER_ROLE:
      return {
        ...state,
        error: null,
        loading: true,
      };
    case CREATE_USER_ROLE_SUCCESS: 
      return {
        ...state, 
        data: action.data,
        error: null,
        loading: false,
      };
    case CREATE_USER_ROLE_FAIL:
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