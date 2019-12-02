import { call, put } from 'redux-saga/effects';
import { listGroupTaskSuccess, listGroupTaskFail } from '../../actions/groupTask/listGroupTask';
import { apiService } from '../../constants/axiosInstance';

async function doListGroupTask({ projectId }) {
  try {
    const config = {
      url: '/group-task/list',
      method: 'get',
      params: {
        project_id: projectId,
      }
    }
    const result = await apiService(config);
    return result.data;
  } catch (error) {
    throw error;
  }
}

function* listGroupTask(action) {
  try {
    const { group_tasks: groupTasks } = yield call(doListGroupTask, action.options);
    yield put(listGroupTaskSuccess({ groupTasks }));
  } catch (error) {
    yield put(listGroupTaskFail(error));
  }
}

export {
  listGroupTask,
}
