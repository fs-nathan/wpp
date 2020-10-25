import { GET_PROJECT_STATISTIC, GET_PROJECT_STATISTIC_SUCCESS, GET_GET_PROJECT_STATISTIC_FAIL } from '../../constants/actions/project/getStatistic';

export const initialState = {
  data: {},
  error: null,
  loading: false,
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_PROJECT_STATISTIC:
      return {
        ...state,
        error: null,
        loading: true,
      };
    case GET_PROJECT_STATISTIC_SUCCESS:
      return {
        ...state,
        data: action.data,
        error: null,
        loading: false,
      };
    case GET_GET_PROJECT_STATISTIC_FAIL:
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