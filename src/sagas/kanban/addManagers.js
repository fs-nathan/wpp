import { get } from 'lodash';
import { call, put } from 'redux-saga/effects';
import { addManagersFail, addManagersSuccess } from 'actions/kanban/addManagers';
import { apiService } from 'constants/axiosInstance';
import { CustomEventEmitter, KANBAN } from 'constants/events';
import { DEFAULT_MESSAGE, SnackbarEmitter, SNACKBAR_VARIANT } from 'constants/snackbarController';

async function doAddManagers({ groupId, managers }) {
  try {
    const config = {
      url: '/kanban/add-manager-to-group',
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

function* addManagers(action) {
  try {
    const { managers } = yield call(doAddManagers, action.options);
    yield put(addManagersSuccess({ managers }, action.options));
    CustomEventEmitter(KANBAN.ADD_MANAGERS.SUCCESS);
    SnackbarEmitter(SNACKBAR_VARIANT.SUCCESS, DEFAULT_MESSAGE.MUTATE.SUCCESS);
  } catch (error) {
    yield put(addManagersFail(error, action.options));
    CustomEventEmitter(KANBAN.ADD_MANAGERS.FAIL);
    SnackbarEmitter(SNACKBAR_VARIANT.ERROR, get(error, 'message', DEFAULT_MESSAGE.QUERY.ERROR));
  }
}

export { addManagers, };

