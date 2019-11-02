import { call, put } from 'redux-saga/effects';
import { deleteProjectSuccess, deleteProjectFail } from '../../actions/project/deleteProject';
import { apiService } from '../../constants/axiosInstance';
import { CustomEventEmitter, UPDATE_PROJECT } from '../../constants/events';

async function doDeleteProject({ projectId }) {
  try {
    const config = {
      url: '/project/delete',
      method: 'delete',
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

function* deleteProject(action) {
  try {
    yield call(doDeleteProject, action.options);
    yield put(deleteProjectSuccess());
    CustomEventEmitter(UPDATE_PROJECT);
  } catch (error) {
    yield put(deleteProjectFail(error));
  }
}

export {
  deleteProject,
}
