import {
  SORT_PROJECT,
  SORT_PROJECT_SUCCESS,
  SORT_PROJECT_FAIL,
} from '../../constants/actions/project/sortProject';

export const initialState = {
  data: null,
  error: null,
  loading: false,
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case SORT_PROJECT:
      return {
        ...state,
        error: null,
        loading: true,
      };
    case SORT_PROJECT_SUCCESS: 
      return {
        ...state, 
        error: null,
        loading: false,
      };
    case SORT_PROJECT_FAIL:
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