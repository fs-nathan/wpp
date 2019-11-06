import { call, put } from 'redux-saga/effects';
import { updateProjectSuccess, updateProjectFail } from '../../actions/project/updateProject';
import { apiService } from '../../constants/axiosInstance';
import { CustomEventEmitter, UPDATE_PROJECT } from '../../constants/events';

async function doUpdateProject({ projectId, name, description, projectGroupId, priority, currency }) {
  try {
    const config = {
      url: '/project/update',
      method: 'put',
      data: {
        project_id: projectId,
        name,
        description,
        project_group_id: projectGroupId,
        priority,
        currency,
      },
    }
    const result = await apiService(config);
    return result.data;
  } catch (error) {
    throw error;
  }
}

function* updateProject(action) {
  try {
    yield call(doUpdateProject, action.options);
    yield put(updateProjectSuccess());
    CustomEventEmitter(UPDATE_PROJECT);
  } catch (error) {
    yield put(updateProjectFail(error));
  }
}

export {
  updateProject,
}
