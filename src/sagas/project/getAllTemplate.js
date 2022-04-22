import { get } from "lodash";
import { call, put } from "redux-saga/effects";
import {
  getAllTemplateFail,
  getAllTemplateSuccess,
} from "../../actions/project/getAllTemplate";
import { apiService } from "../../constants/axiosInstance";
import {
  DEFAULT_MESSAGE,
  SnackbarEmitter,
  SNACKBAR_VARIANT,
} from "../../constants/snackbarController";

async function doGetAllTemplate() {
  try {
    const config = {
      url: "/project/template/seach-template",
      method: "get",
    };
    const result = await apiService(config);
    return result.data;
  } catch (error) {
    throw error;
  }
}

function* getAllTemplate(action) {
  try {
    const { templates } = yield call(doGetAllTemplate);
    yield put(getAllTemplateSuccess({ data: templates }));
  } catch (error) {
    yield put(getAllTemplateFail(error));
    SnackbarEmitter(
      SNACKBAR_VARIANT.ERROR,
      get(error, "message", DEFAULT_MESSAGE.QUERY.ERROR)
    );
  }
}

export { getAllTemplate };
