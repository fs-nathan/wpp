import { call, put } from 'redux-saga/effects';
import { createPositionSuccess, createPositionFail } from '../../actions/position/createPosition';
import { apiService } from '../../constants/axiosInstance';
import { CustomEventEmitter, CREATE_POSITION } from '../../constants/events';

async function doCreatePosition({ name, description }) {
  try {
    const config = {
      url: '/create-position',
      method: 'post',
      data: {
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

function* createPosition(action) {
  try {
    const { position_id: positionId } = yield call(doCreatePosition, action.options);
    yield put(createPositionSuccess({ positionId }));
    CustomEventEmitter(CREATE_POSITION);
  } catch (error) {
    yield put(createPositionFail(error));
  }
}

export {
  createPosition,
}
