// Import actions
import * as types from 'constants/actions/taskDetail/taskDetailConst';
import produce from "immer";
// Initial state for store
export const initialState = {
  taskDetails: {},
  isFetching: null,
  dataFetched: false,
  error: null,
  errorMessage: null,
  showIndex: 0,
  projectSchedules: [],
  payload: null,
  ownerPermissions: null,
  focusId: null,
  location: null,
};

/* eslint-disable default-case, no-param-reassign */
export default (state = initialState, action) => produce(state, draft => {
  switch (action.type) {
    case types.GET_TASK_DETAIL_TABPART_REQUEST:
      draft.isFetching = true
      draft.errorMessage = null
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
      draft.errorMessage = 'This task does not exist'
      break;
    case types.UPDATE_TASK_PRIORITY_REQUEST:
      draft.isFetching = true
      break;
    case types.UPDATE_TASK_PRIORITY_SUCCESS:
      draft.isFetching = false
      draft.dataFetched = true
      draft.taskDetails.priority_code = action.payload.data_chat.priority;
      draft.error = false;
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
      draft.taskDetails.is_stop = true;
      draft.taskDetails.status_label = null;
      break;
    }
    case types.CANCEL_STOP_TASK_SUCCESS: {
      const { payload } = action;
      draft.taskDetails.is_stop = false;
      draft.taskDetails.status_label = payload.status_label;
      draft.taskDetails.state_code = payload.state_code;
      draft.taskDetails.state_name = payload.state_name;
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
      draft.isFetching = false;
      draft.error = false;
      break;
    }
    case types.UPDATE_GROUP_TASK_SUCCESS: {
      const { payload } = action;
      if (payload.group_task) {
        draft.taskDetails.group_task = payload.group_task.id
        draft.taskDetails.group_task_name = payload.group_task.name
      }
      draft.payload = payload;
      draft.isFetching = false;
      draft.error = false;
      break;
    }
    case types.UPDATE_TYPE_ASSIGN_SUCCESS: {
      const { payload } = action;
      draft.payload = payload;
      draft.isFetching = false;
      draft.error = false;
      break;
    }
    case types.UPDATE_SCHEDULE_ASSIGN_SUCCESS: {
      const { payload } = action;
      draft.payload = payload;
      draft.isFetching = false;
      draft.error = false;
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
    case types.POST_TASK_REQUEST:
    case types.UPDATE_NAME_DESCRIPTION:
    case types.UPDATE_GROUP_TASK:
    case types.UPDATE_TYPE_ASSIGN:
    case types.UPDATE_SCHEDULE_ASSIGN:
    case types.UPDATE_NAME_DESCRIPTION_TASK_REQUEST: {
      draft.isFetching = true;
      draft.error = false;
      break;
    }
    case types.POST_TASK_SUCCESS:
    case types.UPDATE_NAME_DESCRIPTION_TASK_SUCCESS: {
      draft.isFetching = false;
      draft.error = false;
      break;
    }
    case types.POST_TASK_FAIL:
    case types.UPDATE_NAME_DESCRIPTION_FAIL:
    case types.UPDATE_GROUP_TASK_FAIL:
    case types.UPDATE_TYPE_ASSIGN_FAIL:
    case types.UPDATE_SCHEDULE_ASSIGN_FAIL:
    case types.UPDATE_NAME_DESCRIPTION_TASK_FAIL: {
      draft.isFetching = false;
      draft.error = true;
      break;
    }
    case types.PIN_TASK_SUCCESS: {
      draft.taskDetails.is_ghim = true;
      break;
    }
    case types.UN_PIN_TASK_SUCCESS: {
      draft.taskDetails.is_ghim = false;
      break;
    }
    case types.FOCUS_TASK_GROUP: {
      const { id } = action;
      draft.focusId = id;
      break;
    }
    case types.CLEAR_FOCUS_TASK_GROUP: {
      draft.focusId = null;
      break;
    }
    case types.SET_LOCATION_DATA: {
      const { location } = action;
      draft.location = location;
      break;
    }
  }
});