import { call, put } from 'redux-saga/effects';
import { createIconSuccess, createIconFail } from '../../actions/icon/createIcon';
import { apiService } from '../../constants/axiosInstance';
import { CustomEventEmitter, CREATE_ICON } from '../../constants/events';

async function doCreateIcon({ icon }) {
  try {
    const formData = new FormData();
    formData.append('image', icon);
    const config = {
      url: '/create-icon',
      method: 'post',
      data: formData,
    }
    const result = await apiService(config);
    return result.data;
  } catch (error) {
    throw error;
  }
}

function* createIcon(action) {
  try {
    const { data_icon: dataIcon } = yield call(doCreateIcon, action.options);
    yield put(createIconSuccess({ dataIcon }));
    CustomEventEmitter(CREATE_ICON);
  } catch (error) {
    yield put(createIconFail(error));
  }
}

export {
  createIcon,
}
