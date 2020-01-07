import {
  COPY_PROJECT,
  COPY_PROJECT_SUCCESS,
  COPY_PROJECT_FAIL,
} from '../../constants/actions/project/copyProject';

export const initialState = {
  data: null,
  error: null,
  loading: false,
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case COPY_PROJECT:
      return {
        ...state,
        error: null,
        loading: true,
      };
    case COPY_PROJECT_SUCCESS: 
      return {
        ...state, 
        error: null,
        loading: false,
      };
    case COPY_PROJECT_FAIL:
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