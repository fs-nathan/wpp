import { call, put } from 'redux-saga/effects';
import { getAllGroupTaskSuccess, getAllGroupTaskFail } from '../../actions/groupTask/getAllGroupTask';
import { apiService } from '../../constants/axiosInstance';

async function doGetAllGroupTask() {
  try {
    const config = {
      url: '/group-task/get-all',
      method: 'get',
    }
    const result = await apiService(config);
    return result.data;
  } catch (error) {
    throw error;
  }
}

function* getAllGroupTask(action) {
  try {
    const { groups: groupTasks } = yield call(doGetAllGroupTask, action.options);
    yield put(getAllGroupTaskSuccess({ groupTasks }));
  } catch (error) {
    yield put(getAllGroupTaskFail(error));
  }
}

export {
  getAllGroupTask,
}
