import { KANBAN_LIST_TASK, KANBAN_LIST_TASK_RESET, KANBAN_LIST_TASK_SUCCESS, KANBAN_LIST_TASK_FAIL } from 'constants/actions/kanban/listTask';
import { KANBAN_SORT_TASK } from 'constants/actions/kanban/sortTask';
import { KANBAN_SORT_GROUP_TASK } from 'constants/actions/kanban/sortGroupTask';
import { reorder, moving } from 'helpers/utils/sortUtils';
import { findIndex } from 'lodash';

export const initialState = {
  data: {
    tasks: [],
  },
  error: null,
  loading: false,
  firstTime: true,
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case KANBAN_LIST_TASK:
      return {
        ...state,
        error: null,
        loading: action.quite ? false : true,
      };
    case KANBAN_LIST_TASK_SUCCESS:
      return {
        ...state,
        data: action.data,
        error: null,
        loading: false,
        firstTime: false,
      };
    case KANBAN_LIST_TASK_FAIL:
      return {
        ...state,
        error: action.error,
        loading: false,
        firstTime: false,
      };
    case KANBAN_LIST_TASK_RESET:
      return initialState;
    /*
     case KANBAN_SORT_TASK: {
      const { source, destination } = action.options.dragEndResult;
      const tasksArr = Array.from(state.data.tasks);       
      const newTasksArr = Array.from(tasksArr);
      if (source.droppableId === destination.droppableId) {
        if (source.index === destination.index) return state;
        const taskIndex = findIndex(tasksArr, { id: source.droppableId });
        const newSubTasksArr = reorder(tasksArr[taskIndex].tasks, source.index, destination.index);
        newTasksArr[taskIndex].tasks = newSubTasksArr;
      } else {
        const sourceIndex = findIndex(tasksArr, { id: source.droppableId });
        const destinationIndex = findIndex(tasksArr, { id: destination.droppableId });
        const [newSourceSubTaskArr, newDestinationSubTaskArr] = moving(tasksArr[sourceIndex].tasks, tasksArr[destinationIndex].tasks, source.index, destination.index);
        newTasksArr[sourceIndex].tasks = newSourceSubTaskArr;
        newTasksArr[destinationIndex].tasks = newDestinationSubTaskArr;
      }
      return {
        ...state,
        data: {
          ...state.data,
          tasks: newTasksArr,
        }
      }
    }
    case KANBAN_SORT_GROUP_TASK:
      const { source, destination } = action.options.dragEndResult;
      const tasksArr = Array.from(state.data.tasks);
      if (source.index === destination.index) return state;
      const newTasksArr = reorder(tasksArr, source.index, destination.index);
      console.log(tasksArr, newTasksArr);
      return {
        ...state,
        data: {
          ...state.data,
          tasks: newTasksArr,
        }
      }
    */
    default:
      return state;
  }
}

export default reducer;