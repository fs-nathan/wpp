import { get } from "lodash";
import { call, put } from "redux-saga/effects";
import {
  getBannerFail,
  getBannerSuccess,
} from "../../actions/project/getBanner";
import { apiService } from "../../constants/axiosInstance";
import {
  DEFAULT_MESSAGE,
  SnackbarEmitter,
  SNACKBAR_VARIANT,
} from "../../constants/snackbarController";

async function doGetBanner() {
  try {
    const config = {
      url: "/project/template/get-banner",
      method: "get",
    };
    const result = await apiService(config);
    return result.data;
  } catch (error) {
    throw error;
  }
}

function* getBanner(action) {
  try {
    const { banners } = yield call(doGetBanner);
    yield put(getBannerSuccess({ data: banners }));
  } catch (error) {
    yield put(getBannerFail(error));
    SnackbarEmitter(
      SNACKBAR_VARIANT.ERROR,
      get(error, "message", DEFAULT_MESSAGE.QUERY.ERROR)
    );
  }
}

export { getBanner };
