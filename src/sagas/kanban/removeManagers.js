import { get } from 'lodash';
import { call, put } from 'redux-saga/effects';
import { removeManagersFail, removeManagersSuccess } from 'actions/kanban/removeManagers';
import { apiService } from 'constants/axiosInstance';
import { CustomEventEmitter, KANBAN } from 'constants/events';
import { DEFAULT_MESSAGE, SnackbarEmitter, SNACKBAR_VARIANT } from 'constants/snackbarController';

async function doRemoveManagers({ groupId, managers }) {
  try {
    const config = {
      url: '/kanban/remove-manager-of-group',
      method: 'post',
      data: {
        group_id: groupId,
        managers,
      },
    }
    const result = await apiService(config);
    return result.data;
  } catch (error) {
    throw error;
  }
}

function* removeManagers(action) {
  try {
    const { managers } = yield call(doRemoveManagers, action.options);
    yield put(removeManagersSuccess({ managers }, action.options));
    CustomEventEmitter(KANBAN.REMOVE_MANAGERS.SUCCESS);
  } catch (error) {
    yield put(removeManagersFail(error, action.options));
    CustomEventEmitter(KANBAN.REMOVE_MANAGERS.FAIL);
    SnackbarEmitter(SNACKBAR_VARIANT.ERROR, get(error, 'message', DEFAULT_MESSAGE.QUERY.ERROR));
  }
}

export { removeManagers, };

