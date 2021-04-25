import { call, put } from 'redux-saga/effects';
import { getListGroupSuccess, getListGroupFail } from '../../actions/groupUser/getListGroup';
import { apiService } from '../../constants/axiosInstance';
import { SnackbarEmitter, SNACKBAR_VARIANT, DEFAULT_MESSAGE } from '../../constants/snackbarController';
import { get } from 'lodash';

async function doGetListGroup() {
  try {
    const config = {
      url: '/get-list-group',
      method: 'get',
    }
    const result = await apiService(config);
    return result.data;
  } catch (error) {
    throw error;
  }
}

function* getListGroup(action) {
  try {
    const { invitations } = yield call(doGetListGroup, action.options);
    yield put(getListGroupSuccess({ invitations }, action.options));
  } catch (error) {
    yield put(getListGroupFail(error, action.options));
    SnackbarEmitter(SNACKBAR_VARIANT.ERROR, get(error, 'message', DEFAULT_MESSAGE.QUERY.ERROR));
  }
}

export {
  getListGroup,
}
