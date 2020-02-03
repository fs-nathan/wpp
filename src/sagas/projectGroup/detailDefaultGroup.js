import { call, put } from 'redux-saga/effects';
import { detailDefaultGroupSuccess, detailDefaultGroupFail } from '../../actions/projectGroup/detailDefaultGroup';
import { apiService } from '../../constants/axiosInstance';
import { SnackbarEmitter, SNACKBAR_VARIANT, DEFAULT_MESSAGE } from '../../constants/snackbarController';
import { get } from 'lodash';

async function doDetailDefaultGroup() {
  try {
    const config = {
      url: '/project-group/detail-default',
      method: 'get',
    }
    const result = await apiService(config);
    return result.data;
  } catch (error) {
    throw error;
  }
}

function* detailDefaultGroup(action) {
  try {
    const { project_group: projectGroup } = yield call(doDetailDefaultGroup, action.options);
    yield put(detailDefaultGroupSuccess({ projectGroup }));
  } catch (error) {
    yield put(detailDefaultGroupFail(error));
    SnackbarEmitter(SNACKBAR_VARIANT.ERROR, get(error, 'message', DEFAULT_MESSAGE.QUERY.ERROR));
  }
}

export {
  detailDefaultGroup,
}
