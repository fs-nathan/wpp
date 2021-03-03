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
  LOADPAGE_TASK_EXPIRED,
  TASK_PAGE_EXPIRED
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

function* doGetDueTasks(payload) {
  try {
    const { status, priority, page } = payload;
    const config = {
      url: `/task-statistic/about-to-expire?${encodeQueryData({
        status,
        priority,
        page,
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

function* doGetExpiredTasks(payload) {
  try {
    const { status, priority, page, timeStart, timeEnd } = payload;
    const config = {
      url: `/task-statistic/expired?${encodeQueryData({
        status,
        priority,
        page,
        from_time: timeStart,
        to_time: timeEnd,
      })}`,
      method: "get",
    };
    const result = yield apiService(config);
    yield put({ type: TASK_PAGE_EXPIRED, payload: result.data });
  } catch (error) {
    console.error(error);
    yield put({
      type: TASK_PAGE_EXPIRED,
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
  page,
}) {
  try {
    const config = {
      url: `/task-statistic/assign?${encodeQueryData({
        from_time: timeStart,
        to_time: timeEnd,
        type_assign: typeAssign,
        status,
        priority,
        page,
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
function* doGetRoleTasks({
  timeStart,
  timeEnd,
  roleId,
  status,
  priority,
  page,
}) {
  try {
    const config = {
      url: `/task-statistic/role?${encodeQueryData({
        from_time: timeStart,
        to_time: timeEnd,
        status,
        priority,
        role_id: roleId,
        page,
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
    const { payload } = yield take(LOADPAGE_TASK_DUE);
    yield all([fork(doGetDueTasks, payload)]);
  }
}

function* watchLoadTaskExpiredPage() {
  while (true) {
    const { payload } = yield take(LOADPAGE_TASK_EXPIRED);
    yield all([fork(doGetExpiredTasks, payload)]);
  }
}

function* watchLoadTaskAssignPage() {
  while (true) {
    const {
      payload: { timeStart, typeAssign, timeEnd, status, priority, page },
    } = yield take(LOADPAGE_TASK_ASSIGN);
    yield all([
      fork(doGetAssignTasks, {
        timeStart,
        typeAssign,
        timeEnd,
        status,
        priority,
        page,
      }),
    ]);
  }
}

function* watchLoadTaskRolePage() {
  while (true) {
    const { payload } = yield take(LOADPAGE_TASK_ROLE);
    yield all([fork(doGetRoleTasks, payload)]);
  }
}
export {
  watchLoadTaskPage,
  watchLoadTaskOverviewPage,
  watchLoadTaskDuePage,
  watchLoadTaskAssignPage,
  watchLoadTaskRolePage,
  watchLoadTaskExpiredPage
};
