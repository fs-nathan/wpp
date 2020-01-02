import { call, put } from 'redux-saga/effects';
import { deletePositionSuccess, deletePositionFail } from '../../actions/position/deletePosition';
import { apiService } from '../../constants/axiosInstance';
import { CustomEventEmitter, DELETE_POSITION } from '../../constants/events';
import { SnackbarEmitter, SNACKBAR_VARIANT, DEFAULT_MESSAGE } from '../../constants/snackbarController';
import { get } from 'lodash';

async function doDeletePosition({ positionId }) {
  try {
    const config = {
      url: '/delete-position',
      method: 'delete',
      data: {
        position_id: positionId,
      }
    }
    const result = await apiService(config);
    return result.data;
  } catch (error) {
    throw error;
  }
}

function* deletePosition(action) {
  try {
    yield call(doDeletePosition, action.options);
    yield put(deletePositionSuccess());
    CustomEventEmitter(DELETE_POSITION);
    SnackbarEmitter(SNACKBAR_VARIANT, DEFAULT_MESSAGE.MUTATE.SUCCESS);
  } catch (error) {
    yield put(deletePositionFail(error));
    SnackbarEmitter(SNACKBAR_VARIANT.ERROR, get(error, 'message', DEFAULT_MESSAGE.MUTATE.ERROR));
  }
}

export {
  deletePosition,
}
