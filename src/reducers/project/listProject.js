import {
  LIST_PROJECT,
  LIST_PROJECT_SUCCESS,
  LIST_PROJECT_FAIL,
} from '../../constants/actions/project/listProject';

export const initialState = {
  data: {
    projects: [],
  },
  error: null,
  loading: false,
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case LIST_PROJECT:
      return {
        ...state,
        error: null,
        loading: true,
      };
    case LIST_PROJECT_SUCCESS: 
      return {
        ...state, 
        data: action.data,
        error: null,
        loading: false,
      };
    case LIST_PROJECT_FAIL:
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