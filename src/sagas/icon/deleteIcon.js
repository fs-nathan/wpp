import { call, put } from 'redux-saga/effects';
import { deleteIconSuccess, deleteIconFail } from '../../actions/icon/deleteIcon';
import { apiService } from '../../constants/axiosInstance';
import { CustomEventEmitter, DELETE_ICON } from '../../constants/events';
import { SnackbarEmitter, SNACKBAR_VARIANT, DEFAULT_MESSAGE } from '../../constants/snackbarController';
import { get } from 'lodash';

async function doCreateIcon({ iconId }) {
  try {
    const config = {
      url: '/delete-icon',
      method: 'delete',
      data: {
        icon_id: iconId,
      }
    }
    const result = await apiService(config);
    return result.data;
  } catch (error) {
    throw error;
  }
}

function* deleteIcon(action) {
  try {
    yield call(doCreateIcon, action.options);
    yield put(deleteIconSuccess(action.options));
    CustomEventEmitter(DELETE_ICON);
    SnackbarEmitter(SNACKBAR_VARIANT.SUCCESS, DEFAULT_MESSAGE.MUTATE.SUCCESS);
  } catch (error) {
    yield put(deleteIconFail(error, action.options));
    SnackbarEmitter(SNACKBAR_VARIANT.ERROR, get(error, 'message', DEFAULT_MESSAGE.MUTATE.ERROR));
  }
}

export {
  deleteIcon,
}
