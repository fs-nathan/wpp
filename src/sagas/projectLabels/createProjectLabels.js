import { get } from "lodash";
import { call, put } from "redux-saga/effects";
import {
  createProjectLabelsFail,
  createProjectLabelsSuccess,
} from "../../actions/projectLabels/createProjectLabels";
import { apiService } from "../../constants/axiosInstance";

import {
  DEFAULT_MESSAGE,
  SnackbarEmitter,
  SNACKBAR_VARIANT,
} from "../../constants/snackbarController";

async function doCreateProjectLabels({ name, color }) {
  try {
    const config = {
      url: "/project-label/create",
      method: "post",
      data: { name, color },
    };
    const result = await apiService(config);
    return result.data;
  } catch (error) {
    throw error;
  }
}

function* createProjectLabels(action) {
  try {
    const { label } = yield call(doCreateProjectLabels, action.options);
    yield put(createProjectLabelsSuccess({ label }, action.options));
    SnackbarEmitter(SNACKBAR_VARIANT.SUCCESS, DEFAULT_MESSAGE.MUTATE.SUCCESS);
  } catch (error) {
    yield put(createProjectLabelsFail(error, action.options));
    SnackbarEmitter(
      SNACKBAR_VARIANT.ERROR,
      get(error, "message", DEFAULT_MESSAGE.MUTATE.ERROR)
    );
  }
}

export { createProjectLabels };
