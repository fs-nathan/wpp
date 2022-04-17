import { get } from "lodash";
import { call, put } from "redux-saga/effects";
import {
  getListTemplateFail,
  getListTemplateSuccess,
} from "../../actions/project/getListTemplate";
import { apiService } from "../../constants/axiosInstance";
import {
  DEFAULT_MESSAGE,
  SnackbarEmitter,
  SNACKBAR_VARIANT,
} from "../../constants/snackbarController";

async function doGetListTemplate() {
  try {
    const config = {
      url: "/project/template/get-list",
      method: "get",
    };
    const result = await apiService(config);
    return result.data;
  } catch (error) {
    throw error;
  }
}

function* getListTemplate(action) {
  try {
    const { data } = yield call(doGetListTemplate);
    yield put(getListTemplateSuccess({ data }));
  } catch (error) {
    yield put(getListTemplateFail(error));
    SnackbarEmitter(
      SNACKBAR_VARIANT.ERROR,
      get(error, "message", DEFAULT_MESSAGE.QUERY.ERROR)
    );
  }
}

export { getListTemplate };
