import { call, put } from 'redux-saga/effects';
import { createTaskSuccess, createTaskFail } from '../../actions/task/createTask';
import { apiService } from '../../constants/axiosInstance';
import { CustomEventEmitter, CREATE_TASK } from '../../constants/events';

async function doCreateTask({ name, groupTask, typeAssign, priority, description, startDate, startTime, endDate, endTime, }) {
  try {
    const config = {
      url: '/task/create',
      method: 'post',
      data: {
        name,
        group_task: groupTask,
        type_assign: typeAssign,
        priority: priority,
        description,
        start_date: startDate,
        start_time: startTime,
        end_date: endDate,
        end_time: endTime,
      },
    }
    const result = await apiService(config);
    return result.data;
  } catch (error) {
    throw error;
  }
}

function* createTask(action) {
  try {
    const { task_id: taskId } = yield call(doCreateTask, action.options);
    yield put(createTaskSuccess({ taskId }));
    CustomEventEmitter(CREATE_TASK);
  } catch (error) {
    yield put(createTaskFail(error));
  }
}

export {
  createTask,
}
