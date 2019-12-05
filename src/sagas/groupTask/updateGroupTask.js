import { call, put } from 'redux-saga/effects';
import { updateGroupTaskSuccess, updateGroupTaskFail } from '../../actions/groupTask/updateGroupTask';
import { apiService } from '../../constants/axiosInstance';
import { CustomEventEmitter, UPDATE_GROUP_TASK } from '../../constants/events';

async function doUpdateGroupTask({ groupTaskId, name, description }) {
  try {
    const config = {
      url: '/group-task/update',
      method: 'put',
      data: {
        group_task_id: groupTaskId,
        name,
        description,
      },
    }
    const result = await apiService(config);
    return result.data;
  } catch (error) {
    throw error;
  }
}

function* updateGroupTask(action) {
  try {
    const { group_task: groupTask } = yield call(doUpdateGroupTask, action.options);
    yield put(updateGroupTaskSuccess({ groupTask }));
    CustomEventEmitter(UPDATE_GROUP_TASK);
  } catch (error) {
    yield put(updateGroupTaskFail(error));
  }
}

export {
  updateGroupTask,
}
