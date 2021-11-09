import { get } from "lodash";
import { call, put } from "redux-saga/effects";
import {
  updateProjectLabelsFail,
  updateProjectLabelsSuccess,
} from "../../actions/projectLabels/editProjectLabels";
import { apiService } from "../../constants/axiosInstance";
import { CustomEventEmitter, UPDATE_PROJECT } from "../../constants/events";
import {
  DEFAULT_MESSAGE,
  SnackbarEmitter,
  SNACKBAR_VARIANT,
} from "../../constants/snackbarController";

async function doUpdateProjectLabels({ label_id, name, color }) {
  try {
    const config = {
      url: "/project-label/update",
      method: "post",
      data: {
        label_id,
        name,
        color,
      },
    };
    const result = await apiService(config);
    return result.data;
  } catch (error) {
    throw error;
  }
}

function* updateProjectLabels(action) {
  try {
    const { label } = yield call(doUpdateProjectLabels, action.options);
    yield put(updateProjectLabelsSuccess({ label }, action.options));
    SnackbarEmitter(SNACKBAR_VARIANT.SUCCESS, DEFAULT_MESSAGE.MUTATE.SUCCESS);
  } catch (error) {
    yield put(updateProjectLabelsFail(error, action.options));
    SnackbarEmitter(
      SNACKBAR_VARIANT.ERROR,
      get(error, "messaage", DEFAULT_MESSAGE.MUTATE.ERROR)
    );
  }
}

export { updateProjectLabels };
