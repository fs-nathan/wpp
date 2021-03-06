import { get } from "lodash";
import { call, put } from "redux-saga/effects";
import {
  createProjectFail,
  createProjectSuccess,
} from "../../actions/project/createProject";
import { apiService } from "../../constants/axiosInstance";
import {
  CREATE_PROJECT,
  CustomEventEmitter,
  CustomEventEmitterWithParams,
} from "../../constants/events";
import {
  DEFAULT_MESSAGE,
  SnackbarEmitter,
  SNACKBAR_VARIANT,
} from "../../constants/snackbarController";

async function doCreateProject({
  name,
  description,
  projectGroupId,
  priority,
  currency,
  projectLabelId,
  view_default,
}) {
  try {
    const config = {
      url: "/project/create",
      method: "post",
      data: {
        name,
        description,
        project_group_id: projectGroupId,
        priority,
        currency,
        project_label_id: projectLabelId,
        view_default,
      },
    };
    const result = await apiService(config);
    return result.data;
  } catch (error) {
    throw error;
  }
}

function* createProject(action) {
  try {
    const { project } = yield call(doCreateProject, action.options);
    // yield put(createProjectSuccess({ project }, action.options));
    CustomEventEmitterWithParams(CREATE_PROJECT.SUCCESS, {
      detail: {
        project_id: project.id,
      },
    });
    SnackbarEmitter(SNACKBAR_VARIANT.SUCCESS, DEFAULT_MESSAGE.MUTATE.SUCCESS);
  } catch (error) {
    yield put(createProjectFail(error, action.options));
    CustomEventEmitter(CREATE_PROJECT.FAIL);
    SnackbarEmitter(
      SNACKBAR_VARIANT.ERROR,
      get(error, "message", DEFAULT_MESSAGE.MUTATE.ERROR)
    );
  }
}

export { createProject };
