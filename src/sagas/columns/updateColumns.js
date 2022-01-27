import {
  DEFAULT_MESSAGE,
  SnackbarEmitter,
  SNACKBAR_VARIANT,
} from "constants/snackbarController";
import { get } from "lodash";
import { call, put } from "redux-saga/effects";
import {
  createColumnsFail,
  createColumnsSuccess,
} from "../../actions/columns/createColumns";
import { apiService } from "../../constants/axiosInstance";

async function doUpdateColumns(data = {}) {
  try {
    const config = {
      data,
      url: "/project-field/update",
      method: "POST",
    };
    const result = await apiService(config);
    return result.data;
  } catch (error) {
    throw error;
  }
}

function* updateColumnsFieldSaga(action) {
  try {
    const { task } = yield call(doUpdateColumns, action.options);
    yield put(createColumnsSuccess({ task }, action.options));
    action.callbackSuccess();
    SnackbarEmitter(SNACKBAR_VARIANT.SUCCESS, DEFAULT_MESSAGE.MUTATE.SUCCESS);
  } catch (error) {
    yield put(createColumnsFail(error, action.options));
    SnackbarEmitter(
      SNACKBAR_VARIANT.ERROR,
      get(error, "message", DEFAULT_MESSAGE.MUTATE.ERROR)
    );
  }
}

export { updateColumnsFieldSaga };
