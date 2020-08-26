import { updateNotificationSettingFail, updateNotificationSettingSuccess } from 'actions/project/setting/updateNotificationSetting';
import { apiService } from 'constants/axiosInstance';
import { CustomEventEmitter, UPDATE_NOTIFICATION_SETTING } from 'constants/events';
import { DEFAULT_MESSAGE, SnackbarEmitter, SNACKBAR_VARIANT } from 'constants/snackbarController';
import { get } from 'lodash';
import { call, put } from 'redux-saga/effects';

async function doUpdateNotificationSetting({ projectId, status }) {
  try {
    const config = {
      url: 'project/setting-notification',
      method: 'post',
      data: {
        project_id: projectId,
        status_noti: status,
      },
    }
    const result = await apiService(config);
    return result.data;
  } catch (error) {
    throw error;
  }
}

function* updateNotificationSetting(action) {
  try {
    yield call(doUpdateNotificationSetting, action.options);
    yield put(updateNotificationSettingSuccess(action.options));
    CustomEventEmitter(UPDATE_NOTIFICATION_SETTING.SUCCESS);
    SnackbarEmitter(SNACKBAR_VARIANT.SUCCESS, DEFAULT_MESSAGE.MUTATE.SUCCESS);
  } catch (error) {
    yield put(updateNotificationSettingFail(error, action.options));
    CustomEventEmitter(UPDATE_NOTIFICATION_SETTING.FAIL);
    SnackbarEmitter(SNACKBAR_VARIANT.ERROR, get(error, 'message', DEFAULT_MESSAGE.MUTATE.ERROR));
  }
}

export { updateNotificationSetting, };

