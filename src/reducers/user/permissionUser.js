import { PERMISSION_USER, PERMISSION_USER_FAIL, PERMISSION_USER_RESET, PERMISSION_USER_SUCCESS } from '../../constants/actions/user/permissionUser';

export const initialState = {
  data: {
    groupPermissions: [],
    adminPermission: null,
  },
  error: null,
  loading: false,
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case PERMISSION_USER:
      return {
        ...state,
        error: null,
        loading: action.quite ? false : true,
      };
    case PERMISSION_USER_SUCCESS:
      return {
        ...state,
        data: action.data,
        error: null,
        loading: false,
      };
    case PERMISSION_USER_FAIL:
      return {
        ...state,
        ...initialState,
        error: action.error,
        loading: false,
      };
    case PERMISSION_USER_RESET:
      return initialState;
    default:
      return state;
  }
}

export default reducer;