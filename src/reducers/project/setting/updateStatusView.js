import { UPDATE_STATUS_VIEW, UPDATE_STATUS_VIEW_FAIL, UPDATE_STATUS_VIEW_SUCCESS } from '../../../constants/actions/project/setting/updateStatusView';

export const initialState = {
  data: {},
  error: null,
  loading: false,
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case UPDATE_STATUS_VIEW:
      return {
        ...state,
        error: null,
        loading: true,
      };
    case UPDATE_STATUS_VIEW_SUCCESS:
      return {
        ...state,
        error: null,
        loading: false,
      };
    case UPDATE_STATUS_VIEW_FAIL:
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