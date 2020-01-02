import { call, put } from 'redux-saga/effects';
import { listUserOfGroupSuccess, listUserOfGroupFail } from '../../actions/user/listUserOfGroup';
import { apiService } from '../../constants/axiosInstance';
import { SnackbarEmitter, SNACKBAR_VARIANT, DEFAULT_MESSAGE } from '../../constants/snackbarController';
import { get } from 'lodash';

async function doListUserOfGroup() {
  try {
    const config = {
      url: '/list-users',
      method: 'get',
    }
    const result = await apiService(config);
    return result.data;
  } catch (error) {
    throw error;
  }
}

function* listUserOfGroup() {
  try {
    const { users } = yield call(doListUserOfGroup);
    yield put(listUserOfGroupSuccess({ rooms: users }));
  } catch (error) {
    yield put(listUserOfGroupFail(error));
    SnackbarEmitter(SNACKBAR_VARIANT.ERROR, get(error, 'message', DEFAULT_MESSAGE.QUERY.ERROR));
  }
}

export {
  listUserOfGroup,
}
