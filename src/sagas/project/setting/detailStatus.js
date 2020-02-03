import { call, put } from 'redux-saga/effects';
import { detailStatusSuccess, detailStatusFail } from '../../../actions/project/setting/detailStatus';
import { apiService } from '../../../constants/axiosInstance';
import { SnackbarEmitter, SNACKBAR_VARIANT, DEFAULT_MESSAGE } from '../../../constants/snackbarController';
import { get } from 'lodash';

async function doDetailStatus({ projectId }) {
  try {
    const config = {
      url: 'project/setting/detail',
      method: 'get',
      params: {
        project_id: projectId,
      },
    }
    const result = await apiService(config);
    return result.data;
  } catch (error) {
    throw error;
  }
}

function* detailStatus(action) {
  try {
    const { can_copy, date_status } = yield call(doDetailStatus, action.options);
    const status = {
      copy: can_copy,
      date: date_status,
    }
    yield put(detailStatusSuccess({ status }));
    SnackbarEmitter(SNACKBAR_VARIANT.SUCCESS, DEFAULT_MESSAGE.QUERY.SUCCESS);
  } catch (error) {
    yield put(detailStatusFail(error));
    SnackbarEmitter(SNACKBAR_VARIANT.ERROR, get(error, 'message', DEFAULT_MESSAGE.QUERY.ERROR));
  }
}

export {
  detailStatus,
}
