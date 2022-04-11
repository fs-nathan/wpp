import { get } from "lodash";
import { call, put } from "redux-saga/effects";
import {
  editProjectGroupFail,
  editProjectGroupSuccess,
} from "../../actions/projectGroup/editProjectGroup";
import { apiService } from "../../constants/axiosInstance";
import { CustomEventEmitter, EDIT_PROJECT_GROUP } from "../../constants/events";
import {
  DEFAULT_MESSAGE,
  SnackbarEmitter,
  SNACKBAR_VARIANT,
} from "../../constants/snackbarController";

async function doEditProjectGroup({
  projectGroupId,
  name,
  icon,
  description,
  work_types,
  color,
}) {
  try {
    const config = {
      url: "/project-group/update",
      method: "put",
      data: {
        project_group_id: projectGroupId,
        name,
        icon,
        description,
        work_types,
        color,
      },
    };
    const result = await apiService(config);
    return result.data;
  } catch (error) {
    throw error;
  }
}

function* editProjectGroup(action) {
  try {
    const { project_group: projectGroup } = yield call(
      doEditProjectGroup,
      action.options
    );
    yield put(editProjectGroupSuccess({ projectGroup }, action.options));
    CustomEventEmitter(EDIT_PROJECT_GROUP.SUCCESS);
    SnackbarEmitter(SNACKBAR_VARIANT.SUCCESS, DEFAULT_MESSAGE.MUTATE.SUCCESS);
  } catch (error) {
    yield put(editProjectGroupFail(error, action.options));
    CustomEventEmitter(EDIT_PROJECT_GROUP.FAIL);
    SnackbarEmitter(
      SNACKBAR_VARIANT.ERROR,
      get(error, "message", DEFAULT_MESSAGE.MUTATE.ERROR)
    );
  }
}

export { editProjectGroup };
