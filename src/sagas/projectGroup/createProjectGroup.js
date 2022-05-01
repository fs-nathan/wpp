import { get, isNil } from "lodash";
import { call, put } from "redux-saga/effects";
import {
  createProjectGroupFail,
  createProjectGroupSuccess,
} from "../../actions/projectGroup/createProjectGroup";
import { apiService } from "../../constants/axiosInstance";
import {
  CREATE_PROJECT_GROUP,
  CustomEventEmitter,
} from "../../constants/events";
import {
  DEFAULT_MESSAGE,
  SnackbarEmitter,
  SNACKBAR_VARIANT,
} from "../../constants/snackbarController";

async function doCreateProjectGroup({
  name,
  icon,
  description,
  work_types,
  color,
}) {
  try {
    const config = {
      url: "/project-group/create",
      method: "post",
      data: !isNil(icon)
        ? {
            name,
            description,
            icon,
            work_types,
            color,
          }
        : {
            name,
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

function* createProjectGroup(action) {
  try {
    const { project_group: projectGroup } = yield call(
      doCreateProjectGroup,
      action.options
    );
    yield put(createProjectGroupSuccess({ projectGroup }, action.options));
    CustomEventEmitter(CREATE_PROJECT_GROUP.SUCCESS);
    SnackbarEmitter(SNACKBAR_VARIANT.SUCCESS, DEFAULT_MESSAGE.MUTATE.SUCCESS);
  } catch (error) {
    yield put(createProjectGroupFail(error, action.options));
    CustomEventEmitter(CREATE_PROJECT_GROUP.FAIL);
    SnackbarEmitter(
      SNACKBAR_VARIANT.ERROR,
      get(error, "message", DEFAULT_MESSAGE.MUTATE.ERROR)
    );
  }
}

export { createProjectGroup };
