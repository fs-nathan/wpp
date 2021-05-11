import { updatePinBoardSettingSuccess, updatePinBoardSettingFail } from 'actions/project/setting/updatePinBoardSetting';
import { apiService } from 'constants/axiosInstance';
import { CustomEventEmitter } from 'constants/events';
import { DEFAULT_MESSAGE, SnackbarEmitter, SNACKBAR_VARIANT } from 'constants/snackbarController';
import { get, isArray } from 'lodash';
import { call, put } from 'redux-saga/effects';
import {UPDATE_PIN_BOARD_SETTING} from "../../../constants/events";
import {countPersonalProjectsBoard} from "../../../actions/project/listProject";

async function doUpdatePinBoardSetting({ projectId, status }) {
  try {
    let config = {};
    if(isArray(projectId)) {
      config = {
        url: '/project/setting/pin-multiple-personal-board',
        method: 'post',
        data: {
          project_ids: projectId,
        },
      }
    } else {
      config = {
        url: status ? 'project/setting/un-pin-to-personal-board' : '/project/setting/pin-to-personal-board',
        method: 'post',
        data: {
          project_id: projectId,
        },
      }
    }
    const result = await apiService(config);
    return result.data;
  } catch (error) {
    throw error;
  }
}

function* updatePinBoardSetting(action) {
  try {
    yield call(doUpdatePinBoardSetting, action.options);
    yield put(updatePinBoardSettingSuccess(action.options));
    yield put(countPersonalProjectsBoard());
    CustomEventEmitter(UPDATE_PIN_BOARD_SETTING.SUCCESS);
    SnackbarEmitter(SNACKBAR_VARIANT.SUCCESS, DEFAULT_MESSAGE.MUTATE.SUCCESS);
  } catch (error) {
    yield put(updatePinBoardSettingFail(error, action.options));
    CustomEventEmitter(UPDATE_PIN_BOARD_SETTING.FAIL);
    SnackbarEmitter(SNACKBAR_VARIANT.ERROR, get(error, 'message', DEFAULT_MESSAGE.MUTATE.ERROR));
  }
}

export { updatePinBoardSetting };

