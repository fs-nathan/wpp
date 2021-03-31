import {
  GET_PROJECTS_RECENTLY,
  GET_PROJECTS_RECENTLY_SUCCESS,
  GET_PROJECTS_RECENTLY_FAIL
} from '../../constants/actions/project/recentlyProjects';

export const initialState = {
  projects: [],
  error: null,
  loading: false,
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_PROJECTS_RECENTLY:
      return {
        ...state,
        error: null,
        loading: true,
      };
    case GET_PROJECTS_RECENTLY_SUCCESS:
      return {
        ...state,
        projects: action.data,
        error: null,
        loading: false,
      };
    case GET_PROJECTS_RECENTLY_FAIL:
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