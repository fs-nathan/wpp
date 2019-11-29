import { call, put } from 'redux-saga/effects';
import { createProjectSuccess, createProjectFail } from '../../actions/project/createProject';
import { apiService } from '../../constants/axiosInstance';
import { CustomEventEmitter, CREATE_PROJECT } from '../../constants/events';

async function doCreateProject({ name, description, projectGroupId, priority, currency }) {
  try {
    const config = {
      url: '/project/create',
      method: 'post',
      data: {
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

function* createProject(action) {
  try {
    const { project } = yield call(doCreateProject, action.options);
    yield put(createProjectSuccess({ project }));
    CustomEventEmitter(CREATE_PROJECT);
  } catch (error) {
    yield put(createProjectFail(error));
  }
}

export {
  createProject,
}
