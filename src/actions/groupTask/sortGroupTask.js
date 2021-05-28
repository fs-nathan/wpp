import {
  SORT_GROUP_TASK,
  SORT_GROUP_TASK_SUCCESS,
  SORT_GROUP_TASK_FAIL,
  IS_SORT_GROUP_TASK,
} from '../../constants/actions/groupTask/sortGroupTask';

export const sortGroupTask = ({ groupTaskId, sortIndex }) => ({
  type: SORT_GROUP_TASK,
  options: {
    groupTaskId, 
    sortIndex,
  }
});

export const sortGroupTaskSuccess = (options) => ({
  type: SORT_GROUP_TASK_SUCCESS,
  options,
});

export const sortGroupTaskFail = (error, options) => ({
  type: SORT_GROUP_TASK_FAIL,
  options,
  error,
});
export const isSortGroupTask = (options) => ({
  type: IS_SORT_GROUP_TASK,
  options,
});