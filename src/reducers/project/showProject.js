import {
  SHOW_PROJECT,
  SHOW_PROJECT_SUCCESS,
  SHOW_PROJECT_FAIL,
} from '../../constants/actions/project/showProject';

export const initialState = {
  data: {},
  error: null,
  loading: false,
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case SHOW_PROJECT:
      return {
        ...state,
        error: null,
        loading: true,
      };
    case SHOW_PROJECT_SUCCESS: 
      return {
        ...state,
        error: null,
        loading: false,
      };
    case SHOW_PROJECT_FAIL:
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