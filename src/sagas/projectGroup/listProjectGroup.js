import { call, put } from 'redux-saga/effects';
import { listProjectGroupSuccess, listProjectGroupFail } from '../../actions/projectGroup/listProjectGroup';
import { apiService } from '../../constants/axiosInstance';
import { SnackbarEmitter, SNACKBAR_VARIANT, DEFAULT_MESSAGE } from '../../constants/snackbarController';
import { get } from 'lodash';

async function doListProjectGroup() {
  try {
    const config = {
      url: '/project-group/list',
      method: 'get',
    }
    const result = await apiService(config);
    return result.data;
  } catch (error) {
    throw error;
  }
}

function* listProjectGroup(action) {
  try {
    const { project_groups: projectGroups } = yield call(doListProjectGroup);
    yield put(listProjectGroupSuccess({ projectGroups }, action.options));
  } catch (error) {
    yield put(listProjectGroupFail(error, action.options));
    SnackbarEmitter(SNACKBAR_VARIANT.ERROR, get(error, 'message', DEFAULT_MESSAGE.QUERY.ERROR));
  }
}

export {
  listProjectGroup,
}
