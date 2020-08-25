import { UPDATE_GROUP_PERMISSION_USER, UPDATE_GROUP_PERMISSION_USER_FAIL, UPDATE_GROUP_PERMISSION_USER_SUCCESS } from '../../constants/actions/user/updateGroupPermissionUser';

export const initialState = {
  error: null,
  loading: false,
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case UPDATE_GROUP_PERMISSION_USER:
      return {
        ...state,
        error: null,
        loading: true,
      };
    case UPDATE_GROUP_PERMISSION_USER_SUCCESS:
      return {
        ...state,
        ...initialState,
        error: null,
        loading: false,
      };
    case UPDATE_GROUP_PERMISSION_USER_FAIL:
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