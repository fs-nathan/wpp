// Import actions
import * as types from '../../constants/actions/taskDetail/taskDetailConst'

// Initial state for store
const initialState = {
  permissions: [],
  isFetching: false,
  dataFetched: false,
  error: false,
};

export default function reducer(state = initialState, action) {

  switch (action.type) {
    case types.GET_PERMISSION_REQUEST:
      return {
        ...state,
        isFetching: true
      }
    case types.GET_PERMISSION_SUCCESS:
      return {
        ...state,
        isFetching: false,
        dataFetched: true,
        permissions: action.payload.group_permissions
      };
    case types.GET_PERMISSION_FAIL:
      return {
        ...state,
        isFetching: false,
        dataFetched: false,
        error: true,
      }
    default:
      return state;
  }
}