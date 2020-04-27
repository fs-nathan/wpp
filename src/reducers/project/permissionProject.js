import { PERMISSION_PROJECT, PERMISSION_PROJECT_FAIL, PERMISSION_PROJECT_RESET, PERMISSION_PROJECT_SUCCESS } from '../../constants/actions/project/permissionProject';

export const initialState = {
  data: {
    groupPermissions: [],
    adminPermission: null,
  },
  error: null,
  loading: false,
  firstTime: true,
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case PERMISSION_PROJECT:
      return {
        ...state,
        error: null,
        loading: action.quite ? false : true,
      };
    case PERMISSION_PROJECT_SUCCESS:
      return {
        ...state,
        data: action.data,
        error: null,
        loading: false,
        firstTime: false,
      };
    case PERMISSION_PROJECT_FAIL:
      return {
        ...state,
        error: action.error,
        loading: false,
        firstTime: false,
      };
    case PERMISSION_PROJECT_RESET:
      return initialState;
    default:
      return state;
  }
}

export default reducer;