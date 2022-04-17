import { get } from "lodash";
import { call, put } from "redux-saga/effects";
import {
  getListTemplateMeSharedFail,
  getListTemplateMeSharedSuccess,
} from "../../actions/project/getListTemplateMeShared";
import { apiService } from "../../constants/axiosInstance";
import {
  DEFAULT_MESSAGE,
  SnackbarEmitter,
  SNACKBAR_VARIANT,
} from "../../constants/snackbarController";

async function doGetListTemplateMeShared() {
  try {
    const config = {
      url: "/project/template/get-list-me-shared",
      method: "get",
    };
    const result = await apiService(config);
    return result.data;
  } catch (error) {
    throw error;
  }
}

function* getListTemplateMeShared(action) {
  try {
    const { templates } = yield call(doGetListTemplateMeShared);
    yield put(getListTemplateMeSharedSuccess({ data: templates }));
  } catch (error) {
    yield put(getListTemplateMeSharedFail(error));
    SnackbarEmitter(
      SNACKBAR_VARIANT.ERROR,
      get(error, "message", DEFAULT_MESSAGE.QUERY.ERROR)
    );
  }
}

export { getListTemplateMeShared };
