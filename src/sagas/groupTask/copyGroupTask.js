import { get } from "lodash";
import { call, put } from "redux-saga/effects";
import {
  copyGroupTaskFail,
  copyGroupTaskSuccess,
} from "../../actions/groupTask/copyGroupTask";
import { apiService } from "../../constants/axiosInstance";
import { COPY_GROUP_TASK, CustomEventEmitter } from "../../constants/events";
import {
  DEFAULT_MESSAGE,
  SnackbarEmitter,
  SNACKBAR_VARIANT,
} from "../../constants/snackbarController";

async function doCopyGroupTask({ groupTaskId, projectId }) {
  try {
    const config = {
      url: "/group-task/copy",
      method: "post",
      data: {
        group_task_id: groupTaskId,
        project_id: projectId,
      },
    };
    const result = await apiService(config);
    return result.data;
  } catch (error) {
    throw error;
  }
}

function* copyGroupTask(action) {
  try {
    const { group_tasks } = yield call(doCopyGroupTask, action.options);
    const groupTasks = group_tasks.map((groupTask) => ({
      ...groupTask,
      id: get(groupTask, "_id"),
    }));
    yield put(copyGroupTaskSuccess({ groupTasks }, action.options));
    CustomEventEmitter(COPY_GROUP_TASK.SUCCESS);
    SnackbarEmitter(SNACKBAR_VARIANT.SUCCESS, DEFAULT_MESSAGE.MUTATE.SUCCESS);
  } catch (error) {
    yield put(copyGroupTaskFail(error, action.options));
    CustomEventEmitter(COPY_GROUP_TASK.FAIL);
    SnackbarEmitter(
      SNACKBAR_VARIANT.ERROR,
      get(error, "message", DEFAULT_MESSAGE.MUTATE.ERROR)
    );
  }
}

export { copyGroupTask };
