/* eslint-disable react-hooks/rules-of-hooks */
import { USE_TEMPLATE } from "constants/actions/project/useTemplate";
import { get } from "lodash";
import { call, put } from "redux-saga/effects";
import {
  useTemplateFail,
  useTemplateReset,
  useTemplateSuccess,
} from "../../actions/project/useTemplate";
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
import { push } from "react-router-redux";
import history from "helpers/utils/history";

async function doUseTemplate({
  template_id,
  name,
  day_start,
  project_group_id,
}) {
  try {
    const config = {
      url: "/use-project-template",
      method: "post",
      data: {
        template_id,
        name,
        day_start,
        project_group_id,
      },
    };
    const result = await apiService(config);
    return result.data;
  } catch (error) {
    throw error;
  }
}

function* useTemplate(action) {
  try {
    const { project } = yield call(doUseTemplate, action.options);
    CustomEventEmitterWithParams(USE_TEMPLATE.SUCCESS, { project });
    yield put(useTemplateSuccess({ project }, action.options));
    history.push("/projects/task-table/" + project.id);
    SnackbarEmitter(SNACKBAR_VARIANT.SUCCESS, DEFAULT_MESSAGE.MUTATE.SUCCESS);
  } catch (error) {
    yield put(useTemplateFail(error, action.options));
    // CustomEventEmitter(CREATE_PROJECT.FAIL);
    SnackbarEmitter(
      SNACKBAR_VARIANT.ERROR,
      get(error, "message", DEFAULT_MESSAGE.MUTATE.ERROR)
    );
  }
}

function* resetUseTemplate(action) {
  try {
    yield put(useTemplateReset());
  } catch (error) {}
}

export { useTemplate, resetUseTemplate };
