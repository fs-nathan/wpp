import {
  CREATE_TASK,
  CREATE_TASK_FAIL,
  CREATE_TASK_SUCCESS,
} from '../../constants/actions/task/createTask';

export const createTask = ({ name, projectId, groupTask, typeAssign, priority, description, startDate, startTime, endDate, endTime, isBasic }) => ({
  type: CREATE_TASK,
  options: {
    name,
    projectId,
    groupTask,
    typeAssign,
    priority,
    description,
    startDate,
    startTime,
    endDate,
    endTime,
    isBasic
  },
});

export const createTaskSuccess = ({ task }, options) => ({
  type: CREATE_TASK_SUCCESS,
  options,
  data: {
    task,
  }
});

export const createTaskFail = (error, options) => ({
  type: CREATE_TASK_FAIL,
  options,
  error,
});