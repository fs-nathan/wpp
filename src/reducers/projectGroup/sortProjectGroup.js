import { SORT_PROJECT_GROUP, SORT_PROJECT_GROUP_FAIL, SORT_PROJECT_GROUP_SUCCESS } from '../../constants/actions/projectGroup/sortProjectGroup';

export const initialState = {
  data: {},
  error: null,
  loading: false,
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case SORT_PROJECT_GROUP:
      return {
        ...state,
        error: null,
        loading: true,
      };
    case SORT_PROJECT_GROUP_SUCCESS:
      return {
        ...state,
        ...initialState,
        error: null,
        loading: false,
      };
    case SORT_PROJECT_GROUP_FAIL:
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