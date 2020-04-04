import { COPY_PROJECT, COPY_PROJECT_FAIL, COPY_PROJECT_SUCCESS } from '../../constants/actions/project/copyProject';

export const initialState = {
  data: {
    project: null
  },
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
        ...initialState,
        data: action.data,
        error: null,
        loading: false,
      };
    case COPY_PROJECT_FAIL:
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