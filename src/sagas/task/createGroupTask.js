import {
  DEFAULT_MESSAGE,
  SnackbarEmitter,
  SNACKBAR_VARIANT,
} from "constants/snackbarController";
import get from "lodash/get";
import { call, put } from "redux-saga/effects";
import {
  createGroupTaskFail,
  createGroupTaskSuccess,
} from "../../actions/task/createGroupTask";
import { apiService } from "../../constants/axiosInstance";

async function doCreateGroupTaskList({ projectId, name }) {
  try {
    const config = {
      url: "/group-task/create",
      method: "post",
      data: {
        project_id: projectId,
        name,
      },
    };
    const result = await apiService(config);
    return result.data;
  } catch (error) {
    throw error;
  }
}

function* createGroupTaskList(action) {
  try {
    const { group_task: groupTask } = yield call(
      doCreateGroupTaskList,
      action.payload
    );
    yield put(
      createGroupTaskSuccess(
        { groupTask, oldId: action.payload.id },
        action.options
      )
    );
  } catch (error) {
    yield put(createGroupTaskFail(error, action.options));
    SnackbarEmitter(
      SNACKBAR_VARIANT.ERROR,
      get(error, "message", DEFAULT_MESSAGE.MUTATE.ERROR)
    );
  }
}

export { createGroupTaskList };
