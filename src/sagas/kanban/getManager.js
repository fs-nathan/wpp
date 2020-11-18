import { get } from 'lodash';
import { call, put } from 'redux-saga/effects';
import { getManagerFail, getManagerSuccess } from 'actions/kanban/getManager';
import { apiService } from 'constants/axiosInstance';
import { CustomEventEmitter, KANBAN } from 'constants/events';
import { DEFAULT_MESSAGE, SnackbarEmitter, SNACKBAR_VARIANT } from 'constants/snackbarController';

async function doGetManager({ groupId }) {
  try {
    const config = {
      url: '/kanban/get-manager-of-group',
      method: 'get',
      params: {
        group_id: groupId,
      },
    }
    const result = await apiService(config);
    return result.data;
  } catch (error) {
    throw error;
  }
}

function* getManager(action) {
  try {
    const { managers } = yield call(doGetManager, action.options);
    yield put(getManagerSuccess({ managers }, action.options));
    CustomEventEmitter(KANBAN.GET_MANAGER.SUCCESS);
  } catch (error) {
    yield put(getManagerFail(error, action.options));
    CustomEventEmitter(KANBAN.GET_MANAGER.FAIL);
    SnackbarEmitter(SNACKBAR_VARIANT.ERROR, get(error, 'message', DEFAULT_MESSAGE.QUERY.ERROR));
  }
}

export { getManager, };

