import {
  DETAIL_PROJECT,
  DETAIL_PROJECT_SUCCESS,
  DETAIL_PROJECT_FAIL,
} from '../../constants/actions/project/detailProject';

export const initialState = {
  data: {
    project: null,
  },
  error: null,
  loading: false,
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case DETAIL_PROJECT:
      return {
        ...state,
        error: null,
        loading: true,
      };
    case DETAIL_PROJECT_SUCCESS: 
      return {
        ...state, 
        data: action.data,
        error: null,
        loading: false,
      };
    case DETAIL_PROJECT_FAIL:
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