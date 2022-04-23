import { get } from "lodash";
import { call, put } from "redux-saga/effects";
import {
  getNewestTemplateFail,
  getNewestTemplateSuccess,
} from "../../actions/project/getNewestTemplate";
import { apiService } from "../../constants/axiosInstance";
import {
  DEFAULT_MESSAGE,
  SnackbarEmitter,
  SNACKBAR_VARIANT,
} from "../../constants/snackbarController";

async function doGetNewestTemplate() {
  try {
    const config = {
      url: "/project/template/newest",
      method: "get",
    };
    const result = await apiService(config);
    return result.data;
  } catch (error) {
    throw error;
  }
}

function* getNewestTemplate(action) {
  try {
    const { templates } = yield call(doGetNewestTemplate);
    yield put(getNewestTemplateSuccess({ data: templates }));
  } catch (error) {
    yield put(getNewestTemplateFail(error));
    SnackbarEmitter(
      SNACKBAR_VARIANT.ERROR,
      get(error, "message", DEFAULT_MESSAGE.QUERY.ERROR)
    );
  }
}

export { getNewestTemplate };
