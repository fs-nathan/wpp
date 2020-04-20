// Import actions
import * as types from 'constants/actions/taskDetail/taskDetailConst';
import produce from "immer";
// Initial state for store
export const initialState = {
  taskDetails: null,
  isFetching: false,
  dataFetched: false,
  error: false,
  showIndex: 0,
  payload: null,
  payload: null,
};

/* eslint-disable default-case, no-param-reassign */
export default (state = initialState, action) => produce(state, draft => {
  switch (action.type) {
    case types.GET_TASK_DETAIL_TABPART_REQUEST:
      draft.isFetching = true
      break;
    case types.GET_TASK_DETAIL_TABPART_SUCCESS:
      draft.isFetching = false
      draft.dataFetched = true
      draft.taskDetails = action.payload.task
      break;
    case types.GET_TASK_DETAIL_TABPART_FAIL:
      draft.isFetching = false
      draft.dataFetched = false
      draft.error = true
      break;
    case types.UPDATE_TASK_PRIORITY_REQUEST:
      draft.isFetching = true
      break;
    case types.UPDATE_TASK_PRIORITY_SUCCESS:
      draft.isFetching = false
      draft.dataFetched = true
      break;
    case types.UPDATE_TASK_PRIORITY_FAIL:
      draft.isFetching = false
      draft.dataFetched = false
      draft.error = true
      break;
    case types.DELETE_TASK_REQUEST:
      draft.isFetching = true
      break;
    case types.DELETE_TASK_SUCCESS:
      draft.isFetching = false
      draft.dataFetched = true
      break;
    case types.DELETE_TASK_FAIL:
      draft.isFetching = false
      draft.dataFetched = false
      draft.error = true
      break;
    case types.SET_SHOW_INDEX:
      draft.showIndex = action.payload
      break;
    case types.STOP_TASK_SUCCESS: {
      const { payload } = action;
      draft.payload = payload;
      break;
    }
    case types.CANCEL_STOP_TASK_SUCCESS: {
      const { payload } = action;
      draft.payload = payload;
      break;
    }
  }
});