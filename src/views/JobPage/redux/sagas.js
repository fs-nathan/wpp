import { all, fork, put, take } from "redux-saga/effects";
import { apiService } from "../../../constants/axiosInstance";
import {
  LOADPAGE_TASK_DUE,
  LOAD_TASK_OVERVIEW,
  TASK_DUE,
  TASK_OVERVIEW_RECENT,
  TASK_OVERVIEW_STATISTIC
} from "./types";

function* doGetStaticTask(timeRange) {
  // console.log("PPPP", project_id)
  try {
    const { timeStart, timeEnd } = timeRange;
    const config = {
      url: `/task-statistic?from_time=${timeStart}&&to_time=${timeEnd}`,
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
      url: "/task-statistic/recently",
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

function* doGetDueTasks() {
  try {
    const config = {
      url: "/task-statistic/about-to-expire",
      method: "get"
    };
    const result = yield apiService(config);
    yield put({ type: TASK_DUE, payload: result.data });
  } catch (error) {
    console.error(error);
    yield put({
      type: TASK_DUE,
      payload: {
        error: error.toString()
      }
    });
  }
}

// watchPage
function* watchLoadTaskOverviewPage() {
  while (true) {
    const {
      payload: { timeRange }
    } = yield take(LOAD_TASK_OVERVIEW);
    yield all([fork(doGetStaticTask, timeRange), fork(doGetStaticTaskRecent)]);
  }
}

function* watchLoadTaskDuePage() {
  while (true) {
    const {} = yield take(LOADPAGE_TASK_DUE);
    yield all([fork(doGetDueTasks)]);
  }
}
export { watchLoadTaskOverviewPage, watchLoadTaskDuePage };
