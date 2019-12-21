import {
  CREATE_TASK,
  CREATE_TASK_FAIL,
  CREATE_TASK_SUCCESS,
} from '../../constants/actions/task/createTask';

export const createTask = ({ name, groupTask, typeAssign, priority, description, startDate, startTime, endDate, endTime }) => ({
  type: CREATE_TASK,
  options: {
    name,
    groupTask,
    typeAssign,
    priority,
    description,
    startDate,
    startTime,
    endDate,
    endTime,
  },
});

export const createTaskSuccess = ({ taskId }) => ({
  type: CREATE_TASK_SUCCESS,
  data: {
    taskId,
  }
});

export const createTaskFail = (error) => ({
  type: CREATE_TASK_FAIL,
  error: error,
});