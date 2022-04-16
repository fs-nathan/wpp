import { get } from "lodash";
import { call, put } from "redux-saga/effects";
import {
  getTemplateCategoryFail,
  getTemplateCategorySuccess,
} from "../../actions/project/getTemplateCategory";
import { apiService } from "../../constants/axiosInstance";
import {
  DEFAULT_MESSAGE,
  SnackbarEmitter,
  SNACKBAR_VARIANT,
} from "../../constants/snackbarController";

async function doGetTemplateCategory() {
  try {
    const config = {
      url: "/project/template/get-category",
      method: "get",
    };
    const result = await apiService(config);
    return result.data;
  } catch (error) {
    throw error;
  }
}

function* getTemplateCategory(action) {
  try {
    const { categories } = yield call(doGetTemplateCategory);
    yield put(getTemplateCategorySuccess({ data: categories }));
  } catch (error) {
    yield put(getTemplateCategoryFail(error));
    SnackbarEmitter(
      SNACKBAR_VARIANT.ERROR,
      get(error, "message", DEFAULT_MESSAGE.QUERY.ERROR)
    );
  }
}

export { getTemplateCategory };
