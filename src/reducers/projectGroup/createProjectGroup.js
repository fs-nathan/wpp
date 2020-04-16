import { CREATE_PROJECT_GROUP, CREATE_PROJECT_GROUP_FAIL, CREATE_PROJECT_GROUP_SUCCESS } from '../../constants/actions/projectGroup/createProjectGroup';

export const initialState = {
  data: {
    projectGroup: null,
  },
  error: null,
  loading: false,
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case CREATE_PROJECT_GROUP:
      return {
        ...state,
        error: null,
        loading: true,
      };
    case CREATE_PROJECT_GROUP_SUCCESS:
      return {
        ...state,
        ...initialState,
        data: action.data,
        error: null,
        loading: false,
      };
    case CREATE_PROJECT_GROUP_FAIL:
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