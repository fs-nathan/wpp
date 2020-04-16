import { UPDATE_PROJECT, UPDATE_PROJECT_FAIL, UPDATE_PROJECT_SUCCESS } from '../../constants/actions/project/updateProject';

export const initialState = {
  data: {
    project: null,
  },
  error: null,
  loading: false,
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case UPDATE_PROJECT:
      return {
        ...state,
        error: null,
        loading: true,
      };
    case UPDATE_PROJECT_SUCCESS:
      return {
        ...state,
        ...initialState,
        data: action.data,
        error: null,
        loading: false,
      };
    case UPDATE_PROJECT_FAIL:
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