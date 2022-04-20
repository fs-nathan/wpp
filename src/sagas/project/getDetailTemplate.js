import { get } from "lodash";
import { call, put } from "redux-saga/effects";
import {
  getDetailTemplateFail,
  getDetailTemplateSuccess,
} from "../../actions/project/getDetailTemplate";
import { apiService } from "../../constants/axiosInstance";
import {
  DEFAULT_MESSAGE,
  SnackbarEmitter,
  SNACKBAR_VARIANT,
} from "../../constants/snackbarController";

async function doGetDetailTemplate({ template_id }) {
  try {
    const config = {
      url: "/project/template/detail",
      method: "get",
      params: { template_id },
    };
    const result = await apiService(config);
    return result.data;
  } catch (error) {
    throw error;
  }
}

function* getDetailTemplate(action) {
  try {
    const { template } = yield call(doGetDetailTemplate, action.options);
    yield put(getDetailTemplateSuccess({ data: template }));
  } catch (error) {
    yield put(getDetailTemplateFail(error));
    SnackbarEmitter(
      SNACKBAR_VARIANT.ERROR,
      get(error, "message", DEFAULT_MESSAGE.QUERY.ERROR)
    );
  }
}

export { getDetailTemplate };
