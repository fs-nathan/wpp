import {
  LIST_DELETED_PROJECT,
  LIST_DELETED_PROJECT_SUCCESS,
  LIST_DELETED_PROJECT_FAIL,
} from '../../constants/actions/project/listDeletedProject';

export const initialState = {
  data: {
    projects: [],
  },
  error: null,
  loading: false,
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case LIST_DELETED_PROJECT:
      return {
        ...state,
        error: null,
        loading: action.quite ? false : true,
      };
    case LIST_DELETED_PROJECT_SUCCESS: 
      return {
        ...state, 
        data: action.data,
        error: null,
        loading: false,
      };
    case LIST_DELETED_PROJECT_FAIL:
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