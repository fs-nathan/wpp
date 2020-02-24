import { call, put } from 'redux-saga/effects';
import { deleteProjectSuccess, deleteProjectFail } from '../../actions/project/deleteProject';
import { apiService } from '../../constants/axiosInstance';
import { CustomEventEmitter, DELETE_PROJECT } from '../../constants/events';
import { SnackbarEmitter, SNACKBAR_VARIANT, DEFAULT_MESSAGE } from '../../constants/snackbarController';
import { get } from 'lodash';

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
    CustomEventEmitter(DELETE_PROJECT);
    SnackbarEmitter(SNACKBAR_VARIANT.SUCCESS, DEFAULT_MESSAGE.MUTATE.SUCCESS);
  } catch (error) {
    yield put(deleteProjectFail(error, action.options));
    SnackbarEmitter(SNACKBAR_VARIANT.ERROR, get(error, 'message', DEFAULT_MESSAGE.MUTATE.ERROR));
  }
}

export {
  deleteProject,
}
