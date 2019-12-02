import { call, put } from 'redux-saga/effects';
import { deleteGroupTaskSuccess, deleteGroupTaskFail } from '../../actions/groupTask/deleteGroupTask';
import { apiService } from '../../constants/axiosInstance';
import { CustomEventEmitter, DELETE_GROUP_TASK } from '../../constants/events';

async function doDeleteGroupTask({ groupTaskId }) {
  try {
    const config = {
      url: '/group-task/delete',
      method: 'delete',
      data: {
        group_task_id: groupTaskId,
      },
    }
    const result = await apiService(config);
    return result.data;
  } catch (error) {
    throw error;
  }
}

function* deleteGroupTask(action) {
  try {
    yield call(doDeleteGroupTask, action.options);
    yield put(deleteGroupTaskSuccess());
    CustomEventEmitter(DELETE_GROUP_TASK);
  } catch (error) {
    yield put(deleteGroupTaskFail(error));
  }
}

export {
  deleteGroupTask,
}
