import { DETAIL_DEFAULT_GROUP, DETAIL_DEFAULT_GROUP_FAIL, DETAIL_DEFAULT_GROUP_SUCCESS } from '../../constants/actions/projectGroup/detailDefaultGroup';

export const initialState = {
  data: {
    projectGroup: null,
  },
  error: null,
  loading: false,
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case DETAIL_DEFAULT_GROUP:
      return {
        ...state,
        error: null,
        loading: action.quite ? false : true,
      };
    case DETAIL_DEFAULT_GROUP_SUCCESS:
      return {
        ...state,
        ...initialState,
        data: action.data,
        error: null,
        loading: false,
      };
    case DETAIL_DEFAULT_GROUP_FAIL:
      return {
        ...state,
        ...initialState,
        error: action.error,
        loading: false,
      }
    default:
      return state;
  }
}

export default reducer;