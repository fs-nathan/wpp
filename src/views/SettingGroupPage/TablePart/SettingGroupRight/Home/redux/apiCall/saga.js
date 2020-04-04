import { apiService } from "constants/axiosInstance";
import { fork, put, take } from "redux-saga/effects";
import { apiCallFailure, apiCallSuccess } from "./actions";
import { API_CALL } from "./types";

function* doAsync(action) {
  const { config, success, failure, asyncId } = action.payload;
  try {
    const result = yield apiService(config);
    yield put(apiCallSuccess({ asyncId }));
    if (success) {
      yield put(success(result.data));
    }
  } catch (error) {
    console.error(error);
    yield put(
      apiCallFailure({
        asyncId,
        error: error.toString(),
        action
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
