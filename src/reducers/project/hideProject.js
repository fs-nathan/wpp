import {
  HIDE_PROJECT,
  HIDE_PROJECT_SUCCESS,
  HIDE_PROJECT_FAIL,
} from '../../constants/actions/project/hideProject';

export const initialState = {
  data: {},
  error: null,
  loading: false,
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case HIDE_PROJECT:
      return {
        ...state,
        error: null,
        loading: true,
      };
    case HIDE_PROJECT_SUCCESS: 
      return {
        ...state,
        error: null,
        loading: false,
      };
    case HIDE_PROJECT_FAIL:
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