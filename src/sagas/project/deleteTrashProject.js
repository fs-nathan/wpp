import { get } from 'lodash';
import { call, put } from 'redux-saga/effects';
import { deleteTrashProjectFail, deleteTrashProjectSuccess } from '../../actions/project/deleteTrashProject';
import { apiService } from '../../constants/axiosInstance';
import { CustomEventEmitter, DELETE_TRASH_PROJECT, DELETE_TRASH_PROJECT_FAIL } from '../../constants/events';
import { DEFAULT_MESSAGE, SnackbarEmitter, SNACKBAR_VARIANT } from '../../constants/snackbarController';

async function doDeleteTrashProject({ projectId }) {
  try {
    const config = {
      url: '/project/delete-in-trash',
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

function* deleteTrashProject(action) {
  try {
    yield call(doDeleteTrashProject, action.options);
    yield put(deleteTrashProjectSuccess(action.options));
    CustomEventEmitter(DELETE_TRASH_PROJECT);
    SnackbarEmitter(SNACKBAR_VARIANT.SUCCESS, DEFAULT_MESSAGE.MUTATE.SUCCESS);
  } catch (error) {
    yield put(deleteTrashProjectFail(error, action.options));
    CustomEventEmitter(DELETE_TRASH_PROJECT_FAIL);
    SnackbarEmitter(SNACKBAR_VARIANT.ERROR, get(error, 'message', DEFAULT_MESSAGE.MUTATE.ERROR));
  }
}

export { deleteTrashProject, };

