import { get } from 'lodash';
import { call, put } from 'redux-saga/effects';
import { deleteProjectFail, deleteProjectSuccess } from '../../actions/project/deleteProject';
import { apiService } from '../../constants/axiosInstance';
import { CustomEventEmitter, DELETE_PROJECT } from '../../constants/events';
import { DEFAULT_MESSAGE, SnackbarEmitter, SNACKBAR_VARIANT } from '../../constants/snackbarController';

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
    yield put(deleteProjectSuccess(action.options));
    CustomEventEmitter(DELETE_PROJECT.SUCCESS);
    SnackbarEmitter(SNACKBAR_VARIANT.SUCCESS, DEFAULT_MESSAGE.MUTATE.SUCCESS);
  } catch (error) {
    yield put(deleteProjectFail(error, action.options));
    CustomEventEmitter(DELETE_PROJECT.FAIL);
    SnackbarEmitter(SNACKBAR_VARIANT.ERROR, get(error, 'message', DEFAULT_MESSAGE.MUTATE.ERROR));
  }
}

export { deleteProject, };

