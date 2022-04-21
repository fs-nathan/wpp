import { call, put } from "redux-saga/effects";
import {
  searchTemplateSuccess,
  searchTemplateFail,
} from "../../actions/project/searchTemplate";
import { apiService } from "../../constants/axiosInstance";
import {
  SnackbarEmitter,
  SNACKBAR_VARIANT,
  DEFAULT_MESSAGE,
} from "../../constants/snackbarController";
import { get } from "lodash";

async function doSearchTemplate({ search_data }) {
  try {
    const config = {
      url: "project/template/seach-template",
      method: "get",
      params: {
        search_data,
      },
    };
    const result = await apiService(config);
    return result.data;
  } catch (error) {
    throw error;
  }
}

function* searchTemplate(action) {
  try {
    const { templates } = yield call(doSearchTemplate, action.options);
    yield put(searchTemplateSuccess({ data: templates }, action.options));
  } catch (error) {
    yield put(searchTemplateFail(error, action.options));
    SnackbarEmitter(
      SNACKBAR_VARIANT.ERROR,
      get(error, "message", DEFAULT_MESSAGE.QUERY.ERROR)
    );
  }
}

export { searchTemplate };
