import { get } from "lodash";
import { call, put } from "redux-saga/effects";
import {
  listProjectLabelSuccess,
  listProjectLabelFail,
} from "../../actions/projectLabels/listProjectLabels";
import { apiService } from "../../constants/axiosInstance";
import { CustomEventEmitter, LIST_PROJECT_GROUP } from "../../constants/events";
import {
  DEFAULT_MESSAGE,
  SnackbarEmitter,
  SNACKBAR_VARIANT,
} from "../../constants/snackbarController";

async function doListProjectLabel(data) {
  try {
    const config = {
      url: "/project-label/list",
      method: "get",
      params: {},
    };
    const result = await apiService(config);
    return result.data;
  } catch (error) {
    throw error;
  }
}

function* listProjectLabel(action) {
  try {
    const { labels } = yield call(doListProjectLabel, action.options);
    yield put(listProjectLabelSuccess({ labels }, action.options));
    CustomEventEmitter(LIST_PROJECT_GROUP.SUCCESS);
  } catch (error) {
    yield put(listProjectLabelFail(error, action.options));
    CustomEventEmitter(LIST_PROJECT_GROUP.FAIL);
    SnackbarEmitter(
      SNACKBAR_VARIANT.ERROR,
      get(error, "message", DEFAULT_MESSAGE.QUERY.ERROR)
    );
  }
}

export { listProjectLabel };
