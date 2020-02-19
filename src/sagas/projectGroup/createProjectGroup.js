import { call, put } from 'redux-saga/effects';
import { createProjectGroupSuccess, createProjectGroupFail } from '../../actions/projectGroup/createProjectGroup';
import { apiService } from '../../constants/axiosInstance';
import { CustomEventEmitter, CREATE_PROJECT_GROUP } from '../../constants/events';
import { SnackbarEmitter, SNACKBAR_VARIANT, DEFAULT_MESSAGE } from '../../constants/snackbarController';
import { get } from 'lodash';

async function doCreateProjectGroup({ name, icon, description }) {
  try {
    const config = {
      url: '/project-group/create',
      method: 'post',
      data: {
        name,
        description,
        icon,
      },
    }
    const result = await apiService(config);
    return result.data;
  } catch (error) {
    throw error;
  }
}

function* createProjectGroup(action) {
  try {
    const { project_group_id: projectGroupId } = yield call(doCreateProjectGroup, action.options);
    yield put(createProjectGroupSuccess({ projectGroupId }, action.options));
    CustomEventEmitter(CREATE_PROJECT_GROUP);
    SnackbarEmitter(SNACKBAR_VARIANT.SUCCESS, DEFAULT_MESSAGE.MUTATE.SUCCESS);
  } catch (error) {
    yield put(createProjectGroupFail(error, action.options));
    SnackbarEmitter(SNACKBAR_VARIANT.ERROR, get(error, 'message', DEFAULT_MESSAGE.MUTATE.ERROR));
  }
}

export {
  createProjectGroup,
}
