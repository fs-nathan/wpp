import { call, put } from 'redux-saga/effects';
import { showProjectSuccess, showProjectFail } from '../../actions/project/showProject';
import { apiService } from '../../constants/axiosInstance';
import { CustomEventEmitter, SHOW_PROJECT } from '../../constants/events';

async function doShowProject({ projectId }) {
  try {
    const config = {
      url: '/project/show',
      method: 'post',
      data: {
        project_id: projectId,
      },
    }
    const result = await apiService(config);
    return result.data;
  } catch (error) {
    throw error;
  }
}

function* showProject(action) {
  try {
    yield call(doShowProject, action.options);
    yield put(showProjectSuccess());
    CustomEventEmitter(SHOW_PROJECT);
  } catch (error) {
    yield put(showProjectFail(error));
  }
}

export {
  showProject,
}
