import { get } from 'lodash';
import { call, put } from 'redux-saga/effects';
import { detailStatusFail, detailStatusSuccess } from '../../../actions/project/setting/detailStatus';
import { apiService } from '../../../constants/axiosInstance';
import { CustomEventEmitter, DETAIL_STATUS } from '../../../constants/events';
import { DEFAULT_MESSAGE, SnackbarEmitter, SNACKBAR_VARIANT } from '../../../constants/snackbarController';

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
    const { can_copy, date_status, task_view, status_noti, is_pin_on_personal_board } = yield call(doDetailStatus, action.options);
    const status = {
      copy: can_copy,
      date: date_status,
      view: task_view,
      notification: status_noti,
      is_pin_on_personal_board
    }
    yield put(detailStatusSuccess({ status }, action.options));
    CustomEventEmitter(DETAIL_STATUS.SUCCESS);
  } catch (error) {
    yield put(detailStatusFail(error, action.options));
    CustomEventEmitter(DETAIL_STATUS.FAIL);
    //SnackbarEmitter(SNACKBAR_VARIANT.ERROR, get(error, 'message', DEFAULT_MESSAGE.QUERY.ERROR));
  }
}

export { detailStatus, };

