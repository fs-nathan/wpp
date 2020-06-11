// Import actions
import * as types from '../../constants/actions/taskDetail/taskDetailConst'
import produce from "immer";

// Initial state for store
const initialState = {
  listGroupTask: null,
  isFetching: false,
  dataFetched: false,
  error: false,
};

/* eslint-disable default-case, no-param-reassign */
export default (state = initialState, action) => produce(state, draft => {
  switch (action.type) {
    case types.GET_LIST_GROUP_TASK_REQUEST:
      {
        draft.isFetching = true;
        break;
      }
    case types.GET_LIST_GROUP_TASK_SUCCESS:
      {
        draft.listGroupTask = action.payload
        draft.isFetching = false
        draft.dataFetched = true
        break;
      }
    case types.GET_LIST_GROUP_TASK_FAIL:
      {
        draft.isFetching = false
        draft.dataFetched = false
        draft.error = true
        draft.listGroupTask = action.payload
        break;
      }
  }
})