import * as actionTypes from '../../constants/actions/setting/setting';

export const actionSettingAccount = typeSetting => {
  return {
    type: actionTypes.CHANGE_SETTING_ACCOUNT,
    payload: typeSetting
  };
};
export const actionSettingGroup = type => {
  return {
    type: actionTypes.CHANGE_SETTING_GROUP,
    payload: type
  };
};
export const actionNotificationSelected = notification => {
  return {
    type: actionTypes.SELECTED_NOTIFICATION,
    payload: notification
  };
};

export const actionChangeBGMenu = colors => {
  return {
    type: actionTypes.CHANGE_BACKGROUND_MENU,
    payload: colors
  };
};
