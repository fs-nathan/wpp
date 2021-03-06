import { UPDATE_STATUS_COPY, UPDATE_STATUS_COPY_FAIL, UPDATE_STATUS_COPY_SUCCESS } from '../../../constants/actions/project/setting/updateStatusCopy';

export const initialState = {
  data: {},
  error: null,
  loading: false,
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case UPDATE_STATUS_COPY:
      return {
        ...state,
        error: null,
        loading: true,
      };
    case UPDATE_STATUS_COPY_SUCCESS:
      return {
        ...state,
        ...initialState,
        error: null,
        loading: false,
      };
    case UPDATE_STATUS_COPY_FAIL:
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