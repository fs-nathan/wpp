import { all, fork, put, take } from "redux-saga/effects";
import { apiService } from "../../../constants/axiosInstance";
import { encodeQueryData } from "../utils";
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
  TASK_ROLE,
} from "./types";

function* doGetStaticTask(timeRange) {
  // console.log("PPPP", project_id)
  try {
    const { timeStart, timeEnd, status, priority } = timeRange;
    const config = {
      url: `/task-statistic?${encodeQueryData({
        from_time: timeStart,
        to_time: timeEnd,
        status,
        priority,
      })}`,
      method: "get",
    };
    const result = yield apiService(config);
    yield put({ type: TASK_OVERVIEW_STATISTIC, payload: result.data });
  } catch (error) {
    console.error(error);
    yield put({
      type: TASK_OVERVIEW_STATISTIC,
      payload: {
        error: error.toString(),
      },
    });
  }
}
function* doGetStaticTaskRecent(timeRange) {
  // console.log("PPPP", project_id)
  try {
    const { status, priority } = timeRange;
    const config = {
      url: `/task-statistic/recently?${encodeQueryData({
        status,
        priority,
      })}`,
      method: "get",
    };
    const result = yield apiService(config);
    yield put({ type: TASK_OVERVIEW_RECENT, payload: result.data });
  } catch (error) {
    console.error(error);
    yield put({
      type: TASK_OVERVIEW_RECENT,
      payload: {
        error: error.toString(),
      },
    });
  }
}

function* doGetDueTasks(timeRange) {
  try {
    const { status, priority } = timeRange;
    const config = {
      url: `/task-statistic/about-to-expire?${encodeQueryData({
        status,
        priority,
      })}`,
      method: "get",
    };
    const result = yield apiService(config);
    yield put({ type: TASK_DUE, payload: result.data });
  } catch (error) {
    console.error(error);
    yield put({
      type: TASK_DUE,
      payload: {
        error: error.toString(),
      },
    });
  }
}

function* doGetAssignTasks({
  timeStart,
  timeEnd,
  typeAssign,
  status,
  priority,
}) {
  try {
    const config = {
      url: `/task-statistic/assign?${encodeQueryData({
        from_time: timeStart,
        to_time: timeEnd,
        type_assign: typeAssign,
        status,
        priority,
      })}`,
      method: "get",
    };
    const result = yield apiService(config);
    yield put({ type: TASK_ASSIGN, payload: result.data });
  } catch (error) {
    console.error(error);
    yield put({
      type: TASK_ASSIGN,
      payload: {
        error: error.toString(),
      },
    });
  }
}
function* doGetRoleTasks({ timeStart, timeEnd, roleId, status, priority }) {
  try {
    const config = {
      url: `/task-statistic/role?${encodeQueryData({
        from_time: timeStart,
        to_time: timeEnd,
        status,
        priority,
        role_id: roleId,
      })}`,
      method: "get",
    };
    const result = yield apiService(config);
    yield put({ type: TASK_ROLE, payload: result.data });
  } catch (error) {
    console.error(error);
    yield put({
      type: TASK_ROLE,
      payload: {
        error: error.toString(),
      },
    });
  }
}
// watchPage
function* watchLoadTaskOverviewPage() {
  while (true) {
    const {
      payload: { timeRange },
    } = yield take(LOAD_TASK_OVERVIEW);
    yield all([fork(doGetStaticTaskRecent, timeRange)]);
  }
}
function* watchLoadTaskPage() {
  while (true) {
    const {
      payload: { timeRange },
    } = yield take(LOADPAGE_TASK);
    yield all([fork(doGetStaticTask, timeRange)]);
  }
}
function* watchLoadTaskDuePage() {
  while (true) {
    const {
      payload: { timeRange },
    } = yield take(LOADPAGE_TASK_DUE);
    yield all([fork(doGetDueTasks, timeRange)]);
  }
}

function* watchLoadTaskAssignPage() {
  while (true) {
    const {
      payload: { timeStart, typeAssign, timeEnd, status, priority },
    } = yield take(LOADPAGE_TASK_ASSIGN);
    yield all([
      fork(doGetAssignTasks, {
        timeStart,
        typeAssign,
        timeEnd,
        status,
        priority,
      }),
    ]);
  }
}

function* watchLoadTaskRolePage() {
  while (true) {
    const {
      payload: { timeStart, timeEnd, roleId, status, priority },
    } = yield take(LOADPAGE_TASK_ROLE);
    yield all([
      fork(doGetRoleTasks, { timeStart, timeEnd, roleId, status, priority }),
    ]);
  }
}
export {
  watchLoadTaskPage,
  watchLoadTaskOverviewPage,
  watchLoadTaskDuePage,
  watchLoadTaskAssignPage,
  watchLoadTaskRolePage,
};
