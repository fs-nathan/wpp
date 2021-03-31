import {UPDATE_PIN_BOARD_SETTING, UPDATE_PIN_BOARD_SETTING_FAIL, UPDATE_PIN_BOARD_SETTING_SUCCESS } from '../../../constants/actions/project/setting/updatePinBoardSetting';

export const updatePinBoardSetting = ({ projectId, status }) => ({
  type: UPDATE_PIN_BOARD_SETTING,
  options: {
    projectId,
    status,
  },
});

export const updatePinBoardSettingSuccess = (options) => ({
  type: UPDATE_PIN_BOARD_SETTING_SUCCESS,
  options,
});

export const updatePinBoardSettingFail = (error, options) => ({
  type: UPDATE_PIN_BOARD_SETTING_FAIL,
  options,
  error,
});