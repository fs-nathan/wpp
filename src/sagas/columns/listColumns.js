import {
  DEFAULT_MESSAGE,
  SnackbarEmitter,
  SNACKBAR_VARIANT,
} from "constants/snackbarController";
import { get } from "lodash";
import { call, put } from "redux-saga/effects";
import {
  listColumnsFail,
  listColumnsSuccess,
} from "../../actions/columns/listColumns";
import { apiService } from "../../constants/axiosInstance";

async function doGetColumns(params) {
  try {
    const config = {
      url: "/project/get-project-field",
      method: "GET",
      params,
    };
    const result = await apiService(config);
    return result.data;
  } catch (error) {
    throw error;
  }
}

function* listColumns(action) {
  try {
    const { data } = yield call(doGetColumns, action.options);
    yield put(listColumnsSuccess({ data }, action.options));
  } catch (error) {
    yield put(listColumnsFail(error, action.options));
    SnackbarEmitter(
      SNACKBAR_VARIANT.ERROR,
      get(error, "message", DEFAULT_MESSAGE.MUTATE.ERROR)
    );
  }
}

export { listColumns };
