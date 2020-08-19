import { LIST_PROJECT_BASIC_INFO, LIST_PROJECT_BASIC_INFO_FAIL, LIST_PROJECT_BASIC_INFO_SUCCESS } from '../../constants/actions/project/listBasic';

export const initialState = {
  data: {
    projects: [],
  },
  error: null,
  loading: false,
  firstTime: true,
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case LIST_PROJECT_BASIC_INFO:
      return {
        ...state,
        error: null,
        loading: action.quite ? false : true,
      };
    case LIST_PROJECT_BASIC_INFO_SUCCESS:
      return {
        ...state,
        data: action.data,
        error: null,
        loading: false
      };
    case LIST_PROJECT_BASIC_INFO_FAIL:
      return {
        ...state,
        error: action.error,
        loading: false
      };
    default:
      return state;
  }
}

export default reducer;