/* eslint-disable react-hooks/rules-of-hooks */
import { get } from "lodash";
import { call, put } from "redux-saga/effects";
import {
  useTemplateFail,
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
    yield call(doUseTemplate, action.options);
    // yield put(useTemplateSuccess({ project }, action.options));
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

export { useTemplate };
