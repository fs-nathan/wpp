import {
	LIST_GROUP_TASK,
	LIST_GROUP_TASK_SUCCESS,
  LIST_GROUP_TASK_FAIL,
  LIST_GROUP_TASK_RESET,
} from '../../constants/actions/groupTask/listGroupTask';
import {
  CREATE_GROUP_TASK_SUCCESS,
} from '../../constants/actions/groupTask/createGroupTask';
import {
  UPDATE_GROUP_TASK_SUCCESS,
} from '../../constants/actions/groupTask/updateGroupTask ';
import {
  DELETE_GROUP_TASK_SUCCESS,
} from '../../constants/actions/groupTask/deleteGroupTask';
import { 
  SORT_GROUP_TASK_SUCCESS, 
} from '../../constants/actions/groupTask/sortGroupTask';
import { 
  COPY_GROUP_TASK_SUCCESS, 
} from '../../constants/actions/groupTask/copyGroupTask';
import { findIndex, get, remove, slice } from 'lodash';

export const initialState = {
	data: {
		groupTasks: [],  
	},
	error: null,
	loading: false,
};

function reducer(state = initialState, action) {
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
    case LIST_GROUP_TASK_RESET:
			return {
				...state,
        data: {
          groupTasks: [],  
        },
        error: null,
        loading: false,
      };
    case COPY_GROUP_TASK_SUCCESS: {
      if (get(action.data, 'groupTasks', []).length === 0) {
        return {
          ...state,
        }
      } else {
        const newGroupTasks = [
          ...get(state.data, 'groupTasks', []), 
          ...get(action.data, 'groupTasks', []),
        ];
        return {
          ...state,
          data: {
            ...state.data,
            groupTasks: newGroupTasks,
          },
        }
      }
    }
    case CREATE_GROUP_TASK_SUCCESS: {
      const newGroupTasks = [
				...get(state.data, 'groupTasks', []), 
				{
					...get(action.data, 'groupTask'),
				},
			];
			return {
				...state,
				data: {
					...state.data,
					groupTasks: newGroupTasks,
				},
			}
    }
    case UPDATE_GROUP_TASK_SUCCESS: {
      let newGroupTasks = [...get(state.data, 'groupTasks', [])];
			let updateIndex = findIndex(newGroupTasks, { id: get(action.options, 'groupTaskId') });
			if (updateIndex > -1) {
				newGroupTasks[updateIndex] = {
					...newGroupTasks[updateIndex],
					...get(action.data, 'groupTask'),
				}
			}
			return {
				...state,
				data: {
					...state.data,
					groupTasks: newGroupTasks,
				},
			}
    }
    case DELETE_GROUP_TASK_SUCCESS: {
      let newGroupTasks = [...get(state.data, 'groupTasks', [])];
      remove(newGroupTasks, { id: get(action.options, 'groupTaskId') });
      return {
        ...state,
        data: {
          ...state.data,
          groupTasks: newGroupTasks,
        },
      }
    }
    case SORT_GROUP_TASK_SUCCESS: {
      let newGroupTasks = [...get(state.data, 'groupTasks', [])];
      let removed = remove(newGroupTasks, { id: get(action.options, 'groupTaskId') });
      newGroupTasks = [
        ...slice(newGroupTasks, 0, get(action.options, 'sortIndex')), 
        ...removed, 
        ...slice(newGroupTasks, get(action.options, 'sortIndex'))
      ];
      return {
        ...state,
        data: {
          ...state.data,
          groupTasks: newGroupTasks,
        },
      }
    }
		default:
			return state;
	}
}

export default reducer;