import { call, put } from 'redux-saga/effects';
import { sortProjectSuccess, sortProjectFail } from '../../actions/project/sortProject';
import { apiService } from '../../constants/axiosInstance';
import { CustomEventEmitter, SORT_PROJECT } from '../../constants/events';

async function doSortProject({ projectId, sortIndex, }) {
  try {
    const config = {
      url: '/project/sort',
      method: 'post',
      data: {
        project_id: projectId,
        sort_index: sortIndex,
      },
    }
    const result = await apiService(config);
    return result.data;
  } catch (error) {
    throw error;
  }
}

function* sortProject(action) {
  try {
    yield call(doSortProject, action.options);
    yield put(sortProjectSuccess({}));
    CustomEventEmitter(SORT_PROJECT);
  } catch (error) {
    yield put(sortProjectFail(error));
  }
}

export {
  sortProject,
}
