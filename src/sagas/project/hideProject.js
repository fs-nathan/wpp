import { call, put } from 'redux-saga/effects';
import { hideProjectSuccess, hideProjectFail } from '../../actions/project/hideProject';
import { apiService } from '../../constants/axiosInstance';
import { CustomEventEmitter, HIDE_PROJECT } from '../../constants/events';
import { SnackbarEmitter, SNACKBAR_VARIANT, DEFAULT_MESSAGE } from '../../constants/snackbarController';
import { get } from 'lodash';

async function doHideProject({ projectId }) {
  try {
    const config = {
      url: '/project/hide',
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

function* hideProject(action) {
  try {
    yield call(doHideProject, action.options);
    yield put(hideProjectSuccess());
    CustomEventEmitter(HIDE_PROJECT);
    SnackbarEmitter(SNACKBAR_VARIANT.SUCCESS, DEFAULT_MESSAGE.MUTATE.SUCCESS);
  } catch (error) {
    yield put(hideProjectFail(error));
    SnackbarEmitter(SNACKBAR_VARIANT.ERROR, get(error, 'message', DEFAULT_MESSAGE.MUTATE.ERROR));
  }
}

export {
  hideProject,
}
