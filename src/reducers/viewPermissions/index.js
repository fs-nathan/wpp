import { GET_PERMISSION_VIEW_DETAIL_PROJECT, GET_PERMISSION_VIEW_DETAIL_PROJECT_FAIL, GET_PERMISSION_VIEW_DETAIL_PROJECT_SUCCESS, GET_PERMISSION_VIEW_PROJECTS, GET_PERMISSION_VIEW_PROJECTS_FAIL, GET_PERMISSION_VIEW_PROJECTS_SUCCESS, GET_PERMISSION_VIEW_USERS, GET_PERMISSION_VIEW_USERS_FAIL, GET_PERMISSION_VIEW_USERS_SUCCESS } from '../../constants/actions/viewPermissions';

export const initialState = {
  data: {
    users: null,
    projects: null,
    detailProject: {},
  },
  error: null,
  loading: false,
  firstTime: true,
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_PERMISSION_VIEW_PROJECTS:
    case GET_PERMISSION_VIEW_USERS:
    case GET_PERMISSION_VIEW_DETAIL_PROJECT:
      return {
        ...state,
        error: null,
        loading: action.quite ? false : true,
      };
    case GET_PERMISSION_VIEW_PROJECTS_SUCCESS:
    case GET_PERMISSION_VIEW_USERS_SUCCESS:
      return {
        ...state,
        data: {
          ...state.data,
          ...action.data,
        },
        error: null,
        loading: false,
        firstTime: false,
      };
    case GET_PERMISSION_VIEW_DETAIL_PROJECT_SUCCESS:
      return {
        ...state,
        data: {
          ...state.data,
          detailProject: {
            ...state.data.detailProject,
            [action.options.projectId]: action.data.detailProject,
          }
        },
        error: null,
        loading: false,
        firstTime: false,
      };
    case GET_PERMISSION_VIEW_PROJECTS_FAIL:
    case GET_PERMISSION_VIEW_USERS_FAIL:
    case GET_PERMISSION_VIEW_DETAIL_PROJECT_FAIL:
      return {
        ...state,
        error: action.error,
        loading: false,
        firstTime: false,
      };
    default:
      return state;
  }
}

export default reducer;