import { all, fork, put, take } from "redux-saga/effects";
import { apiService } from "../../../constants/axiosInstance";
import {
  LOADPAGE_TASK,
  LOADPAGE_TASK_ASSIGN,
  LOADPAGE_TASK_DUE,
  LOADPAGE_TASK_ROLE,
  LOAD_TASK_OVERVIEW,
  TASK_ASSIGN,
  TASK_DUE,
  TASK_OVERVIEW_RECENT,
  TASK_OVERVIEW_STATISTIC,
  TASK_ROLE
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

function* doGetAssignTasks({ timeStart, timeEnd, typeAssign }) {
  try {
    const config = {
      url: `/task-statistic/assign?from_time=${timeStart}&&to_time=${timeEnd}&&type_assign=${typeAssign}`,
      method: "get"
    };
    const result = yield apiService(config);
    yield put({ type: TASK_ASSIGN, payload: result.data });
  } catch (error) {
    console.error(error);
    yield put({
      type: TASK_ASSIGN,
      payload: {
        error: error.toString()
      }
    });
  }
}
function* doGetRoleTasks({ timeStart, timeEnd, roleId }) {
  try {
    const config = {
      url: `/task-statistic/role?from_time=${timeStart}&&to_time=${timeEnd}&&role_id=${roleId}`,
      method: "get"
    };
    const result = yield apiService(config);
    yield put({ type: TASK_ROLE, payload: result.data });
  } catch (error) {
    console.error(error);
    yield put({
      type: TASK_ROLE,
      payload: {
        error: error.toString()
      }
    });
  }
}
// watchPage
function* watchLoadTaskOverviewPage() {
  while (true) {
    const {} = yield take(LOAD_TASK_OVERVIEW);
    yield all([fork(doGetStaticTaskRecent)]);
  }
}
function* watchLoadTaskPage() {
  while (true) {
    const {
      payload: { timeRange }
    } = yield take(LOADPAGE_TASK);
    yield all([fork(doGetStaticTask, timeRange)]);
  }
}
function* watchLoadTaskDuePage() {
  while (true) {
    const {} = yield take(LOADPAGE_TASK_DUE);
    yield all([fork(doGetDueTasks)]);
  }
}

function* watchLoadTaskAssignPage() {
  while (true) {
    const {
      payload: { timeStart, typeAssign, timeEnd }
    } = yield take(LOADPAGE_TASK_ASSIGN);
    yield all([fork(doGetAssignTasks, { timeStart, typeAssign, timeEnd })]);
  }
}

function* watchLoadTaskRolePage() {
  while (true) {
    const {
      payload: { timeStart, timeEnd, roleId }
    } = yield take(LOADPAGE_TASK_ROLE);
    yield all([fork(doGetRoleTasks, { timeStart, timeEnd, roleId })]);
  }
}
export {
  watchLoadTaskPage,
  watchLoadTaskOverviewPage,
  watchLoadTaskDuePage,
  watchLoadTaskAssignPage,
  watchLoadTaskRolePage
};
