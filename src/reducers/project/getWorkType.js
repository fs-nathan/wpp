import { GET_WORK_TYPE_SUCCESS, GET_WORK_TYPE_FAIL, GET_WORK_TYPE } from '../../constants/actions/project/getWorkType';

export const initialState = {
  data: {
    work_type: null
  },
  error: null,
  loading: false,
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_WORK_TYPE:
      return {
        ...state,
        error: null,
        loading: true,
      };
    case GET_WORK_TYPE_SUCCESS:
      return {
        ...state,
        ...initialState,
        data: action.options,
        error: null,
        loading: false,
      };
    case GET_WORK_TYPE_FAIL:
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