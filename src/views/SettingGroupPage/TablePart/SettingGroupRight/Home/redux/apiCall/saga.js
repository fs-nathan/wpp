import { apiService } from "constants/axiosInstance";
import {
  DEFAULT_MESSAGE,
  SnackbarEmitter,
  SNACKBAR_VARIANT,
} from "constants/snackbarController";
import { fork, put, take } from "redux-saga/effects";
import { get } from "views/JobPage/utils";
import { apiCallFailure, apiCallSuccess } from "./actions";
import { API_CALL } from "./types";

function* doAsync(action) {
  const {
    config,
    success,
    failure,
    notifyOnFailure,
    notifyOnSuccess,
    asyncId,
  } = action.payload;
  try {
    const result = yield apiService(config);
    if (!result.data.state) throw new Error(result.data.error_code);
    notifyOnSuccess &&
      SnackbarEmitter(SNACKBAR_VARIANT.SUCCESS, DEFAULT_MESSAGE.MUTATE.SUCCESS);
    yield put(apiCallSuccess({ asyncId, data: result.data }));

    if (success) {
      yield put(success(result.data));
    }
  } catch (error) {
    console.error(error);
    notifyOnFailure &&
      SnackbarEmitter(
        SNACKBAR_VARIANT.ERROR,
        get(error, "message", DEFAULT_MESSAGE.MUTATE.ERROR)
      );
    yield put(
      apiCallFailure({
        asyncId,
        error: error.toString(),
        action,
      })
    );
    if (failure) {
      yield put(failure(error));
    }
  }
}
function* watchAsyncAction() {
  while (true) {
    const action = yield take(API_CALL);
    yield fork(doAsync, action);
  }
}

export default watchAsyncAction;
