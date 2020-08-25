import { DETAIL_STATUS, DETAIL_STATUS_FAIL, DETAIL_STATUS_RESET, DETAIL_STATUS_SUCCESS } from '../../../constants/actions/project/setting/detailStatus';

export const initialState = {
  data: {
    status: null,
  },
  error: null,
  loading: false,
  firstTime: true,
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case DETAIL_STATUS:
      return {
        ...state,
        error: null,
        loading: action.quite ? false : true,
      };
    case DETAIL_STATUS_SUCCESS:
      return {
        ...state,
        data: action.data,
        error: null,
        loading: false,
        firstTime: false,
      };
    case DETAIL_STATUS_FAIL:
      return {
        ...state,
        error: action.error,
        loading: false,
        firstTime: false,
      };
    case DETAIL_STATUS_RESET:
      return initialState;
    default:
      return state;
  }
}

export default reducer;