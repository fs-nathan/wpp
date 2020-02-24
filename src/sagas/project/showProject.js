import { call, put } from 'redux-saga/effects';
import { showProjectSuccess, showProjectFail } from '../../actions/project/showProject';
import { apiService } from '../../constants/axiosInstance';
import { CustomEventEmitter, SHOW_PROJECT } from '../../constants/events';
import { SnackbarEmitter, SNACKBAR_VARIANT, DEFAULT_MESSAGE } from '../../constants/snackbarController';
import { get } from 'lodash';

async function doShowProject({ projectId }) {
  try {
    const config = {
      url: '/project/show',
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

function* showProject(action) {
  try {
    yield call(doShowProject, action.options);
    yield put(showProjectSuccess(action.options));
    CustomEventEmitter(SHOW_PROJECT);
    SnackbarEmitter(SNACKBAR_VARIANT.SUCCESS, DEFAULT_MESSAGE.MUTATE.SUCCESS);
  } catch (error) {
    yield put(showProjectFail(error, action.options));
    SnackbarEmitter(SNACKBAR_VARIANT.ERROR, get(error, 'message', DEFAULT_MESSAGE.MUTATE.ERROR));
  }
}

export {
  showProject,
}
