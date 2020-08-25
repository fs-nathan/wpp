import { REMOVE_GROUP_PERMISSION_MEMBER, REMOVE_GROUP_PERMISSION_MEMBER_FAIL, REMOVE_GROUP_PERMISSION_MEMBER_SUCCESS } from '../../constants/actions/project/removeGroupPermissionMember';

export const initialState = {
  data: {},
  error: null,
  loading: false,
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case REMOVE_GROUP_PERMISSION_MEMBER:
      return {
        ...state,
        error: null,
        loading: true,
      };
    case REMOVE_GROUP_PERMISSION_MEMBER_SUCCESS:
      return {
        ...state,
        ...initialState,
        error: null,
        loading: false,
      };
    case REMOVE_GROUP_PERMISSION_MEMBER_FAIL:
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