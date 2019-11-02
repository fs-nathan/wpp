import {
  DELETE_PROJECT,
  DELETE_PROJECT_SUCCESS,
  DELETE_PROJECT_FAIL,
} from '../../constants/actions/project/deleteProject';

export const initialState = {
  data: {},
  error: null,
  loading: false,
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case DELETE_PROJECT:
      return {
        ...state,
        error: null,
        loading: true,
      };
    case DELETE_PROJECT_SUCCESS: 
      return {
        ...state, 
        error: null,
        loading: false,
      };
    case DELETE_PROJECT_FAIL:
      return {
        ...state,
        error: action.error,
        loading: false,
      };
    default:
      return state;
  }
}

export default reducer;