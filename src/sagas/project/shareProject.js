import { call, put } from "redux-saga/effects";
import {
  shareProjectFail,
  shareProjectSuccess,
} from "../../actions/project/shareProject";
import { apiService } from "../../constants/axiosInstance";
import { CustomEventEmitter, SORT_PROJECT } from "../../constants/events";
import {
  SnackbarEmitter,
  SNACKBAR_VARIANT,
  DEFAULT_MESSAGE,
} from "../../constants/snackbarController";
import { get } from "lodash";

async function doShareProject(options) {
  try {
    const config = {
      method: "post",
      url: "/project/template/share",
      data: options,
    };
    const result = await apiService(config);
    return result.data;
  } catch (error) {
    throw error;
  }
}

function* shareProject(action) {
  try {
    yield call(doShareProject, action.options);
    // yield put(shareProjectSuccess(action.options));
    // CustomEventEmitter(SORT_PROJECT);
    // SnackbarEmitter(SNACKBAR_VARIANT.SUCCESS, DEFAULT_MESSAGE.MUTATE.SUCCESS);
  } catch (error) {
    yield put(shareProjectFail(error, action.options));
    SnackbarEmitter(
      SNACKBAR_VARIANT.ERROR,
      get(error, "message", DEFAULT_MESSAGE.MUTATE.ERROR)
    );
  }
}

export { shareProject };
