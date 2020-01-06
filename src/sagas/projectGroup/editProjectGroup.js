import { call, put } from 'redux-saga/effects';
import { editProjectGroupSuccess, editProjectGroupFail } from '../../actions/projectGroup/editProjectGroup';
import { apiService } from '../../constants/axiosInstance';
import { CustomEventEmitter, EDIT_PROJECT_GROUP } from '../../constants/events';
import { SnackbarEmitter, SNACKBAR_VARIANT, DEFAULT_MESSAGE } from '../../constants/snackbarController';
import { get } from 'lodash';

async function doEditProjectGroup({ projectGroupId, name, icon, description }) {
  try {
    const config = {
      url: '/project-group/update',
      method: 'put',
      data: {
        project_group_id: projectGroupId,
        name,
        icon,
        description,
      },
    }
    const result = await apiService(config);
    return result.data;
  } catch (error) {
    throw error;
  }
}

function* editProjectGroup(action) {
  try {
    yield call(doEditProjectGroup, action.options);
    yield put(editProjectGroupSuccess());
    CustomEventEmitter(EDIT_PROJECT_GROUP);
    SnackbarEmitter(SNACKBAR_VARIANT.SUCCESS, DEFAULT_MESSAGE.MUTATE.SUCCESS);
  } catch (error) {
    yield put(editProjectGroupFail(error));
    SnackbarEmitter(SNACKBAR_VARIANT.ERROR, get(error, 'message', DEFAULT_MESSAGE.MUTATE.ERROR));
  }
}

export {
  editProjectGroup,
}
