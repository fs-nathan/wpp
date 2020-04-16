import { UPDATE_STATUS_DATE, UPDATE_STATUS_DATE_FAIL, UPDATE_STATUS_DATE_SUCCESS } from '../../../constants/actions/project/setting/updateStatusDate';

export const initialState = {
  data: {},
  error: null,
  loading: false,
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case UPDATE_STATUS_DATE:
      return {
        ...state,
        error: null,
        loading: true,
      };
    case UPDATE_STATUS_DATE_SUCCESS:
      return {
        ...state,
        ...initialState,
        error: null,
        loading: false,
      };
    case UPDATE_STATUS_DATE_FAIL:
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