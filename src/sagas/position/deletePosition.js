import { call, put } from 'redux-saga/effects';
import { deletePositionSuccess, deletePositionFail } from '../../actions/position/deletePosition';
import { apiService } from '../../constants/axiosInstance';
import { CustomEventEmitter, DELETE_POSITION } from '../../constants/events';

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
  } catch (error) {
    yield put(deletePositionFail(error));
  }
}

export {
  deletePosition,
}
