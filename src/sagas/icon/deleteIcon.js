import { call, put } from 'redux-saga/effects';
import { deleteIconSuccess, deleteIconFail } from '../../actions/icon/deleteIcon';
import { apiService } from '../../constants/axiosInstance';
import { CustomEventEmitter, DELETE_ICON } from '../../constants/events';

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
    yield put(deleteIconSuccess());
    CustomEventEmitter(DELETE_ICON);
  } catch (error) {
    yield put(deleteIconFail(error));
  }
}

export {
  deleteIcon,
}
