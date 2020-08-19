import { DETAIL_DEFAULT_GROUP, DETAIL_DEFAULT_GROUP_FAIL, DETAIL_DEFAULT_GROUP_RESET, DETAIL_DEFAULT_GROUP_SUCCESS } from '../../constants/actions/projectGroup/detailDefaultGroup';

export const initialState = {
  data: {
    projectGroup: null,
  },
  error: null,
  loading: false,
  firstTime: true,
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
        data: action.data,
        error: null,
        loading: false,
        firstTime: false,
      };
    case DETAIL_DEFAULT_GROUP_FAIL:
      return {
        ...state,
        error: action.error,
        loading: false,
        firstTime: false,
      }
    case DETAIL_DEFAULT_GROUP_RESET:
      return initialState;
    default:
      return state;
  }
}

export default reducer;