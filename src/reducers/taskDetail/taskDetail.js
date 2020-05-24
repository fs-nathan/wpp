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
  projectSchedules: [],
  payload: null,
  ownerPermissions: null,
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
      draft.taskDetails.priority_code = action.payload.data_chat.priority;
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
      draft.taskDetails.state_code = 4;
      break;
    }
    case types.CANCEL_STOP_TASK_SUCCESS: {
      const { payload } = action;
      draft.taskDetails.state_code = 0;
      break;
    }
    case types.DELETE_SHARE_LOCATION_SUCCESS: {
      const { payload } = action;
      break;
    }
    case types.UPDATE_NAME_DESCRIPTION_SUCCESS: {
      const { payload } = action;
      draft.taskDetails.name = payload.data_chat.new_task_name;
      draft.taskDetails.description = payload.data_chat.new_description;
      break;
    }
    case types.UPDATE_GROUP_TASK_SUCCESS: {
      const { payload } = action;
      draft.payload = payload;
      break;
    }
    case types.UPDATE_TYPE_ASSIGN_SUCCESS: {
      const { payload } = action;
      draft.payload = payload;
      break;
    }
    case types.UPDATE_SCHEDULE_ASSIGN_SUCCESS: {
      const { payload } = action;
      draft.payload = payload;
      break;
    }
    case types.GET_SCHEDULES_SUCCESS: {
      const { payload } = action;
      draft.projectSchedules = payload.schedules;
      break;
    }
    case types.REMOVE_GROUP_PERMISSION_OF_MEMBER_SUCCESS: {
      const { payload } = action;
      draft.payload = payload;
      break;
    }
    case types.DETAIL_GROUP_PERMISSION_DEFAULT_SUCCESS: {
      const { payload } = action;
      draft.ownerPermissions = payload.group_detail;
      break;
    }
  }
});