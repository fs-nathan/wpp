import {
  DETAIL_STATUS,
  DETAIL_STATUS_SUCCESS,
  DETAIL_STATUS_FAIL,
} from '../../../constants/actions/project/setting/detailStatus';

export const initialState = {
  data: {
    status: null,
  },
  error: null,
  loading: false,
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
      };
    case DETAIL_STATUS_FAIL:
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