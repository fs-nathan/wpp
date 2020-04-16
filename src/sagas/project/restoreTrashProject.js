import { get } from 'lodash';
import { call, put } from 'redux-saga/effects';
import { restoreTrashProjectFail, restoreTrashProjectSuccess } from '../../actions/project/restoreTrashProject';
import { apiService } from '../../constants/axiosInstance';
import { CustomEventEmitter, RESTORE_TRASH_PROJECT } from '../../constants/events';
import { DEFAULT_MESSAGE, SnackbarEmitter, SNACKBAR_VARIANT } from '../../constants/snackbarController';

async function doRestoreTrashProject({ projectId }) {
  try {
    const config = {
      url: '/project/restore-project',
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

function* restoreTrashProject(action) {
  try {
    yield call(doRestoreTrashProject, action.options);
    yield put(restoreTrashProjectSuccess(action.options));
    CustomEventEmitter(RESTORE_TRASH_PROJECT);
    SnackbarEmitter(SNACKBAR_VARIANT.SUCCESS, DEFAULT_MESSAGE.MUTATE.SUCCESS);
  } catch (error) {
    yield put(restoreTrashProjectFail(error, action.options));
    SnackbarEmitter(SNACKBAR_VARIANT.ERROR, get(error, 'message', DEFAULT_MESSAGE.MUTATE.ERROR));
  }
}

export { restoreTrashProject, };

