import {
  SORT_GROUP_TASK,
  SORT_GROUP_TASK_SUCCESS,
  SORT_GROUP_TASK_FAIL,
} from '../../constants/actions/groupTask/sortGroupTask';

export const sortGroupTask = ({ groupTaskId, sortIndex, }) => ({
  type: SORT_GROUP_TASK,
  options: {
    groupTaskId, 
    sortIndex,
  }
});

export const sortGroupTaskSuccess = () => ({
  type: SORT_GROUP_TASK_SUCCESS,
  data: {
  },
});

export const sortGroupTaskFail = (error) => ({
  type: SORT_GROUP_TASK_FAIL,
  error: error,
});