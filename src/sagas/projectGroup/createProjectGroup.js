import { call, put } from 'redux-saga/effects';
import { createProjectGroupSuccess, createProjectGroupFail } from '../../actions/projectGroup/createProjectGroup';
import { apiService } from '../../constants/axiosInstance';
import { CustomEventEmitter, CREATE_PROJECT_GROUP } from '../../constants/events';

async function doCreateProjectGroup({ name, icon, description }) {
  try {
    const config = {
      url: '/project-group/create',
      method: 'post',
      data: {
        name,
        description,
        icon,
      },
    }
    const result = await apiService(config);
    return result.data;
  } catch (error) {
    throw error;
  }
}

function* createProjectGroup(action) {
  try {
    const { project_group_id: projectGroupId } = yield call(doCreateProjectGroup, action.options);
    yield put(createProjectGroupSuccess({ projectGroupId }));
    CustomEventEmitter(CREATE_PROJECT_GROUP);
  } catch (error) {
    yield put(createProjectGroupFail(error));
  }
}

export {
  createProjectGroup,
}
