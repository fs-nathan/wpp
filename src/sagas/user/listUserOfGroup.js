import { get } from 'lodash';
import { call, put } from 'redux-saga/effects';
import { listUserOfGroupFail, listUserOfGroupSuccess } from '../../actions/user/listUserOfGroup';
import { apiService } from '../../constants/axiosInstance';
import { CustomEventEmitter, LIST_USER_OF_GROUP } from '../../constants/events';
import { DEFAULT_MESSAGE, SnackbarEmitter, SNACKBAR_VARIANT } from '../../constants/snackbarController';

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

function* listUserOfGroup(action) {
  try {
    const { users, max_user: maxUser } = yield call(doListUserOfGroup);
    yield put(listUserOfGroupSuccess({ rooms: users, maxUser }, action.options));
    CustomEventEmitter(LIST_USER_OF_GROUP.SUCCESS);
  } catch (error) {
    yield put(listUserOfGroupFail(error, action.options));
    CustomEventEmitter(LIST_USER_OF_GROUP.FAIL);
    SnackbarEmitter(SNACKBAR_VARIANT.ERROR, get(error, 'message', DEFAULT_MESSAGE.QUERY.ERROR));
  }
}

export { listUserOfGroup, };

