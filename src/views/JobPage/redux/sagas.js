import { all, fork, put, take } from "redux-saga/effects";
import { apiService } from "../../../constants/axiosInstance";
import {
  LOAD_TASK_OVERVIEW,
  TASK_OVERVIEW_RECENT,
  TASK_OVERVIEW_STATISTIC
} from "./types";

function* doGetStaticTask(project_id) {
  // console.log("PPPP", project_id)
  try {
    const config = {
      url:
        "https://appapi.workplus.vn/api/v1/task-statistic?from_time=2019/01/01&&to_time=2020/05/01",
      method: "get"
    };
    const result = yield apiService(config);
    yield put({ type: TASK_OVERVIEW_STATISTIC, payload: result.data });
  } catch (error) {
    console.error(error);
    yield put({
      type: TASK_OVERVIEW_STATISTIC,
      payload: {
        error: error.toString()
      }
    });
  }
}
function* doGetStaticTaskRecent(project_id) {
  // console.log("PPPP", project_id)
  try {
    const config = {
      url: "https://appapi.workplus.vn/api/v1/task-statistic/recently",
      method: "get"
    };
    const result = yield apiService(config);
    yield put({ type: TASK_OVERVIEW_RECENT, payload: result.data });
  } catch (error) {
    console.error(error);
    yield put({
      type: TASK_OVERVIEW_RECENT,
      payload: {
        error: error.toString()
      }
    });
  }
}
function* watchLoadTaskOverviewPage() {
  while (true) {
    const { login, requiredFields = [] } = yield take(LOAD_TASK_OVERVIEW);
    yield all([fork(doGetStaticTask), fork(doGetStaticTaskRecent)]);
  }
}
export { watchLoadTaskOverviewPage };
