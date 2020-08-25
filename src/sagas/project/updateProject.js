import { get } from 'lodash';
import { call, put } from 'redux-saga/effects';
import { updateProjectFail, updateProjectSuccess } from '../../actions/project/updateProject';
import { apiService } from '../../constants/axiosInstance';
import { CustomEventEmitter, UPDATE_PROJECT } from '../../constants/events';
import { DEFAULT_MESSAGE, SnackbarEmitter, SNACKBAR_VARIANT } from '../../constants/snackbarController';

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
    CustomEventEmitter(UPDATE_PROJECT.SUCCESS);
    SnackbarEmitter(SNACKBAR_VARIANT.SUCCESS, DEFAULT_MESSAGE.MUTATE.SUCCESS);
  } catch (error) {
    yield put(updateProjectFail(error, action.options));
    CustomEventEmitter(UPDATE_PROJECT.FAIL);
    SnackbarEmitter(SNACKBAR_VARIANT.ERROR, get(error, 'messaage', DEFAULT_MESSAGE.MUTATE.ERROR));
  }
}

export { updateProject, };

