import { call, put } from 'redux-saga/effects';
import { updatePositionSuccess, updatePositionFail } from '../../actions/position/updatePosition';
import { apiService } from '../../constants/axiosInstance';
import { CustomEventEmitter, UPDATE_POSITION } from '../../constants/events';
import { SnackbarEmitter, SNACKBAR_VARIANT, DEFAULT_MESSAGE } from '../../constants/snackbarController';
import { get } from 'lodash';

async function doUpdatePosition({ positionId, name, description }) {
  try {
    const config = {
      url: '/update-position',
      method: 'put',
      data: {
        position_id: positionId,
        name,
        description,
      }
    }
    const result = await apiService(config);
    return result.data;
  } catch (error) {
    throw error;
  }
}

function* updatePosition(action) {
  try {
    const { position } = yield call(doUpdatePosition, action.options);
    yield put(updatePositionSuccess({ position }));
    CustomEventEmitter(UPDATE_POSITION);
    SnackbarEmitter(SNACKBAR_VARIANT.SUCCESS, DEFAULT_MESSAGE.MUTATE.SUCCESS);
  } catch (error) {
    yield put(updatePositionFail(error));
    SnackbarEmitter(SNACKBAR_VARIANT.ERROR, get(error, 'message', DEFAULT_MESSAGE.MUTATE.ERROR));
  }
}

export {
  updatePosition,
}
