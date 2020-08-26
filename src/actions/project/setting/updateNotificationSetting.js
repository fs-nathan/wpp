import { UPDATE_NOTIFICATION_SETTING, UPDATE_NOTIFICATION_SETTING_FAIL, UPDATE_NOTIFICATION_SETTING_SUCCESS } from '../../../constants/actions/project/setting/updateNotificationSetting';

export const updateNotificationSetting = ({ projectId, status }) => ({
  type: UPDATE_NOTIFICATION_SETTING,
  options: {
    projectId,
    status,
  },
});

export const updateNotificationSettingSuccess = (options) => ({
  type: UPDATE_NOTIFICATION_SETTING_SUCCESS,
  options,
});

export const updateNotificationSettingFail = (error, options) => ({
  type: UPDATE_NOTIFICATION_SETTING_FAIL,
  options,
  error,
});