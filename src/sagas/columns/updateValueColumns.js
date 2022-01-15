import {
  DEFAULT_MESSAGE,
  SnackbarEmitter,
  SNACKBAR_VARIANT,
} from "constants/snackbarController";
import { get } from "lodash";
import { call, put } from "redux-saga/effects";
import {
  updateValueColumnsFail,
  updateValueColumnsSuccess,
} from "../../actions/columns/updateValueColumns";
import { apiService } from "../../constants/axiosInstance";

async function doUpdateValueColumns(data = {}) {
  try {
    const config = {
      data,
      url: "/task/update-value-of-field",
      method: "POST",
    };
    const result = await apiService(config);
    return result.data;
  } catch (error) {
    throw error;
  }
}

function* updateColumnsSaga(action) {
  try {
    const { task } = yield call(doUpdateValueColumns, action.options);
    yield put(updateValueColumnsSuccess({ task }, action.options));
    action.callbackSuccess();
    SnackbarEmitter(SNACKBAR_VARIANT.SUCCESS, DEFAULT_MESSAGE.MUTATE.SUCCESS);
  } catch (error) {
    yield put(updateValueColumnsFail(error, action.options));
    SnackbarEmitter(
      SNACKBAR_VARIANT.ERROR,
      get(error, "message", DEFAULT_MESSAGE.MUTATE.ERROR)
    );
  }
}

export { updateColumnsSaga };
