import { get } from 'lodash';
import { call, put } from 'redux-saga/effects';
import { updateManagersSuccess, updateManagersFail } from 'actions/kanban/updateManagers';
import { apiService } from 'constants/axiosInstance';
import { CustomEventEmitter, KANBAN } from 'constants/events';
import { DEFAULT_MESSAGE, SnackbarEmitter, SNACKBAR_VARIANT } from 'constants/snackbarController';

async function doAddManagers({ groupId, managersAdded }) {
  try {
    const config = {
      url: '/kanban/add-manager-to-group',
      method: 'post',
      data: {
        group_id: groupId,
        managers: managersAdded,
      },
    }
    const result = await apiService(config);
    return result.data;
  } catch (error) {
    throw error;
  }
}

async function doRemoveManagers({ groupId, managersRemoved }) {
  try {
    const config = {
      url: '/kanban/remove-manager-of-group',
      method: 'post',
      data: {
        group_id: groupId,
        managers: managersRemoved,
      },
    }
    const result = await apiService(config);
    return result.data;
  } catch (error) {
    throw error;
  }
}

function* updateManagers(action) {
  try {
    let data;
    data = yield call(doAddManagers, action.options);
    data = yield call(doRemoveManagers, action.options);
    yield put(updateManagersSuccess({ managers: data.managers }, action.options));
    CustomEventEmitter(KANBAN.UPDATE_MANAGERS.SUCCESS);
    SnackbarEmitter(SNACKBAR_VARIANT.SUCCESS, DEFAULT_MESSAGE.MUTATE.SUCCESS);
  } catch (error) {
    yield put(updateManagersFail(error, action.options));
    CustomEventEmitter(KANBAN.UPDATE_MANAGERS.FAIL);
    SnackbarEmitter(SNACKBAR_VARIANT.ERROR, get(error, 'message', DEFAULT_MESSAGE.QUERY.ERROR));
  }
}

export { updateManagers, };

