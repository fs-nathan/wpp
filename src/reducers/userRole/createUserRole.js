import { CREATE_USER_ROLE, CREATE_USER_ROLE_FAIL, CREATE_USER_ROLE_SUCCESS } from '../../constants/actions/userRole/createUserRole';

export const initialState = {
  data: {
    userRole: null,
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
        ...initialState,
        data: action.data,
        error: null,
        loading: false,
      };
    case CREATE_USER_ROLE_FAIL:
      return {
        ...state,
        ...initialState,
        error: action.error,
        loading: false,
      };
    default:
      return state;
  }
}

export default reducer;