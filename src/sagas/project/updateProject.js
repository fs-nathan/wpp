import { call, put } from 'redux-saga/effects';
import { updateProjectSuccess, updateProjectFail } from '../../actions/project/updateProject';
import { apiService } from '../../constants/axiosInstance';
import { CustomEventEmitter, UPDATE_PROJECT } from '../../constants/events';
import { SnackbarEmitter, SNACKBAR_VARIANT, DEFAULT_MESSAGE } from '../../constants/snackbarController';
import { get } from 'lodash';

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
    const { project } = yield call(doUpdateProject, action.options);
    yield put(updateProjectSuccess({ project }, action.options));
    CustomEventEmitter(UPDATE_PROJECT);
    SnackbarEmitter(SNACKBAR_VARIANT.SUCCESS, DEFAULT_MESSAGE.MUTATE.SUCCESS);
  } catch (error) {
    yield put(updateProjectFail(error, action.options));
    SnackbarEmitter(SNACKBAR_VARIANT.ERROR, get(error, 'messaage', DEFAULT_MESSAGE.MUTATE.ERROR));
  }
}

export {
  updateProject,
}
