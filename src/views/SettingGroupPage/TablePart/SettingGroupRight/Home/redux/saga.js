import { apiService } from "constants/axiosInstance";
import { fork, put, take } from "redux-saga/effects";

export const API_CALL = "API_CALL";
export const API_CALL_SUCCESS = "API_CALL_SUCCESS";
export const API_CALL_FAILURE = "API_CALL_FAILURE";

function* doAsync(action) {
  const { config, success, failure } = action.payload;
  try {
    const result = yield apiService(config);
    yield put({ type: API_CALL_SUCCESS });
    if (success) {
      yield put(success(result.data));
    }
  } catch (error) {
    console.error(error);
    yield put({ type: API_CALL_FAILURE, error: error.toString(), action });
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
