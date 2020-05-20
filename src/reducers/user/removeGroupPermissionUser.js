import { REMOVE_GROUP_PERMISSION_USER, REMOVE_GROUP_PERMISSION_USER_FAIL, REMOVE_GROUP_PERMISSION_USER_SUCCESS } from '../../constants/actions/user/removeGroupPermissionUser';

export const initialState = {
  error: null,
  loading: false,
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case REMOVE_GROUP_PERMISSION_USER:
      return {
        ...state,
        error: null,
        loading: true,
      };
    case REMOVE_GROUP_PERMISSION_USER_SUCCESS:
      return {
        ...state,
        ...initialState,
        error: null,
        loading: false,
      };
    case REMOVE_GROUP_PERMISSION_USER_FAIL:
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