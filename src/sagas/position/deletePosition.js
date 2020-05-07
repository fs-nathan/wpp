import { get } from 'lodash';
import { call, put } from 'redux-saga/effects';
import { deletePositionFail, deletePositionSuccess } from '../../actions/position/deletePosition';
import { apiService } from '../../constants/axiosInstance';
import { CustomEventEmitter, DELETE_POSITION } from '../../constants/events';
import { DEFAULT_MESSAGE, SnackbarEmitter, SNACKBAR_VARIANT } from '../../constants/snackbarController';

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
    yield put(deletePositionSuccess(action.options));
    CustomEventEmitter(DELETE_POSITION.SUCCESS);
    SnackbarEmitter(SNACKBAR_VARIANT.SUCCESS, DEFAULT_MESSAGE.MUTATE.SUCCESS);
  } catch (error) {
    yield put(deletePositionFail(error, action.options));
    CustomEventEmitter(DELETE_POSITION.FAIL);
    SnackbarEmitter(SNACKBAR_VARIANT.ERROR, get(error, 'message', DEFAULT_MESSAGE.MUTATE.ERROR));
  }
}

export { deletePosition, };

