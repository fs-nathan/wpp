import {
	LIST_GROUP_TASK,
	LIST_GROUP_TASK_SUCCESS,
	LIST_GROUP_TASK_FAIL,
} from '../../constants/actions/groupTask/listGroupTask';
import {
  CREATE_GROUP_TASK_SUCCESS,
} from '../../constants/actions/groupTask/createGroupTask';
import {
  UPDATE_GROUP_TASK_SUCCESS,
} from '../../constants/actions/groupTask/updateGroupTask ';
import {
  DELETE_GROUP_TASK,
} from '../../constants/actions/groupTask/deleteGroupTask';
import { 
  SORT_GROUP_TASK 
} from '../../constants/actions/groupTask/sortGroupTask';
import { concat, findIndex, get, remove, slice } from 'lodash';

export const initialState = {
	data: {
		groupTasks: [],  
	},
	error: null,
	loading: false,
};

function reducer(state = initialState, action) {
  let groupTasks = [];
  let index = 0;
	switch (action.type) {
		case LIST_GROUP_TASK:
			return {
				...state,
				error: null,
				loading: action.quite ? false : true,
			};
		case LIST_GROUP_TASK_SUCCESS: 
			return {
				...state, 
				data: action.data,
				error: null,
				loading: false,
			};
		case LIST_GROUP_TASK_FAIL:
			return {
				...state,
				error: action.error,
				loading: false,
      };
    case CREATE_GROUP_TASK_SUCCESS:
      groupTasks = concat(action.data.groupTask, [...state.data.groupTasks], );
      return {
        ...state,
        data: {
          ...state.data,
          groupTasks,
        },
      };
    case UPDATE_GROUP_TASK_SUCCESS:
      groupTasks = [...state.data.groupTasks];
      index = findIndex(groupTasks, { id: get(action.data.groupTask, 'id') });
      groupTasks[index] = {
        ...groupTasks[index],
        ...action.data.groupTask,
      };
      return {
        ...state,
        data: {
          ...state.data,
          groupTasks,
        },
      };
    case DELETE_GROUP_TASK:
      groupTasks = [...state.data.groupTasks];
      remove(groupTasks, { id: get(action.options, 'groupTaskId') });
      return {
        ...state,
        data: {
          ...state.data,
          groupTasks,
        },
      };   
    case SORT_GROUP_TASK: 
      groupTasks = [...state.data.groupTasks];
      let removed = remove(groupTasks, { id: get(action.options, 'groupTaskId') });
      groupTasks = [...slice(groupTasks, 0, action.options.sortIndex), ...removed, ...slice(groupTasks, action.options.sortIndex)];
      return {
        ...state,
        data: {
          ...state.data,
          groupTasks,
        },
      };  
		default:
			return state;
	}
}

export default reducer;