import { get } from "lodash";
import { call, put } from "redux-saga/effects";
import {
  getTemplateByCategoryFail,
  getTemplateByCategorySuccess,
} from "../../actions/project/getTemplateByCategory";
import { apiService } from "../../constants/axiosInstance";
import {
  DEFAULT_MESSAGE,
  SnackbarEmitter,
  SNACKBAR_VARIANT,
} from "../../constants/snackbarController";

async function doGetTemplateByCategory({ category_id }) {
  try {
    console.log(category_id);
    const config = {
      url: "/project/template/get-list-of-category",
      method: "get",
      params: { category_id },
    };
    const result = await apiService(config);
    return result.data;
  } catch (error) {
    throw error;
  }
}

function* getTemplateByCategory(action) {
  try {
    const { templates } = yield call(doGetTemplateByCategory, action.options);
    yield put(getTemplateByCategorySuccess({ data: templates }));
  } catch (error) {
    yield put(getTemplateByCategoryFail(error));
    SnackbarEmitter(
      SNACKBAR_VARIANT.ERROR,
      get(error, "message", DEFAULT_MESSAGE.QUERY.ERROR)
    );
  }
}

export { getTemplateByCategory };
