import {
  GET_PROJECT_STATUS_WORK,
  GET_PROJECT_STATUS_WORK_FAIL,
  GET_PROJECT_STATUS_WORK_SUCCESS
} from '../../constants/actions/project/getStatusWork';

export const initialState = {
  data: {},
  error: null,
  loading: false,
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_PROJECT_STATUS_WORK:
      return {
        ...state,
        error: null,
        loading: true,
      };
    case GET_PROJECT_STATUS_WORK_SUCCESS:
      return {
        ...state,
        data: action.data,
        error: null,
        loading: false,
      };
    case GET_PROJECT_STATUS_WORK_FAIL:
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