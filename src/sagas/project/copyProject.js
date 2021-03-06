import { get } from 'lodash';
import { call, put } from 'redux-saga/effects';
import { copyProjectFail, copyProjectSuccess } from '../../actions/project/copyProject';
import { apiService } from '../../constants/axiosInstance';
import { COPY_PROJECT, CustomEventEmitter, CustomEventEmitterWithParams } from '../../constants/events';
import { DEFAULT_MESSAGE, SnackbarEmitter, SNACKBAR_VARIANT } from '../../constants/snackbarController';

async function doCopyProject({ projectId, name, description, startDate, isCopyMember, workType, workGroup }) {
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
        work_type: workType,
        project_group_id: workGroup
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
    const { project } = yield call(doCopyProject, action.options);
    // yield put(copyProjectSuccess({ project }, action.options));
    // CustomEventEmitter(COPY_PROJECT.SUCCESS);
    CustomEventEmitterWithParams(COPY_PROJECT.SUCCESS, {
      detail: {
        project_id: project.id,
      }
    });
    SnackbarEmitter(SNACKBAR_VARIANT.SUCCESS, DEFAULT_MESSAGE.MUTATE.SUCCESS);
  } catch (error) {
    yield put(copyProjectFail(error, action.options));
    CustomEventEmitter(COPY_PROJECT.FAIL);
    SnackbarEmitter(SNACKBAR_VARIANT.ERROR, get(error, 'message', DEFAULT_MESSAGE.MUTATE.ERROR));
  }
}

export { copyProject, };

