import { get } from 'lodash';
import { call, put } from 'redux-saga/effects';
import { deleteProjectGroupFail, deleteProjectGroupSuccess } from '../../actions/projectGroup/deleteProjectGroup';
import { apiService } from '../../constants/axiosInstance';
import { CustomEventEmitter, DELETE_PROJECT_GROUP } from '../../constants/events';
import { DEFAULT_MESSAGE, SnackbarEmitter, SNACKBAR_VARIANT } from '../../constants/snackbarController';

async function doDeleteProjectGroup({ projectGroupId }) {
  try {
    const config = {
      url: '/project-group/delete',
      method: 'delete',
      data: {
        project_group_id: projectGroupId,
      },
    }
    const result = await apiService(config);
    return result.data;
  } catch (error) {
    throw error;
  }
}

function* deleteProjectGroup(action) {
  try {
    yield call(doDeleteProjectGroup, action.options);
    yield put(deleteProjectGroupSuccess(action.options));
    CustomEventEmitter(DELETE_PROJECT_GROUP.SUCCESS);
    SnackbarEmitter(SNACKBAR_VARIANT.SUCCESS, DEFAULT_MESSAGE.MUTATE.SUCCESS);
  } catch (error) {
    yield put(deleteProjectGroupFail(error, action.options));
    CustomEventEmitter(DELETE_PROJECT_GROUP.FAIL);
    SnackbarEmitter(SNACKBAR_VARIANT.ERROR, get(error, 'message', DEFAULT_MESSAGE.MUTATE.ERROR));
  }
}

export { deleteProjectGroup, };

