import { get } from "lodash";
import { call, put } from "redux-saga/effects";
import {
  cancelShareFail,
  cancelShareSuccess,
} from "../../actions/project/cancelShare";
import { apiService } from "../../constants/axiosInstance";
import { CustomEventEmitter, DELETE_PROJECT } from "../../constants/events";
import {
  DEFAULT_MESSAGE,
  SnackbarEmitter,
  SNACKBAR_VARIANT,
} from "../../constants/snackbarController";

async function doCancelShare({ projectId }) {
  try {
    const config = {
      url: "/project/template/cancel-share",
      method: "post",
      data: {
        project_id: projectId,
      },
    };
    const result = await apiService(config);
    return result.data;
  } catch (error) {
    throw error;
  }
}

function* cancelShare(action) {
  try {
    yield call(doCancelShare, action.options);
    yield put(cancelShareSuccess(action.options));
    SnackbarEmitter(SNACKBAR_VARIANT.SUCCESS, DEFAULT_MESSAGE.MUTATE.SUCCESS);
  } catch (error) {
    yield put(cancelShareFail(error, action.options));
    SnackbarEmitter(
      SNACKBAR_VARIANT.ERROR,
      get(error, "message", DEFAULT_MESSAGE.MUTATE.ERROR)
    );
  }
}

export { cancelShare };
