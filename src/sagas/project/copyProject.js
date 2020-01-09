import { call, put } from 'redux-saga/effects';
import { copyProjectSuccess, copyProjectFail } from '../../actions/project/copyProject';
import { apiService } from '../../constants/axiosInstance';
import { CustomEventEmitter, COPY_PROJECT } from '../../constants/events';
import { SnackbarEmitter, SNACKBAR_VARIANT, DEFAULT_MESSAGE } from '../../constants/snackbarController';
import { get } from 'lodash';

async function doCopyProject({ projectId, name, description, startDate, isCopyMember }) {
  try {
    const config = {
      url: '/project/copy',
      method: 'post',
      data: {
        project_id: projectId,
        name,
        description,
        day_start: startDate,
        is_copy_member: isCopyMember,
      },
    }
    const result = await apiService(config);
    return result.data;
  } catch (error) {
    throw error;
  }
}

function* copyProject(action) {
  try {
    yield call(doCopyProject, action.options);
    yield put(copyProjectSuccess({}));
    CustomEventEmitter(COPY_PROJECT);
    SnackbarEmitter(SNACKBAR_VARIANT.SUCCESS, DEFAULT_MESSAGE.MUTATE.SUCCESS);
  } catch (error) {
    yield put(copyProjectFail(error));
    SnackbarEmitter(SNACKBAR_VARIANT.ERROR, get(error, 'message', DEFAULT_MESSAGE.MUTATE.ERROR));
  }
}

export {
  copyProject,
}
