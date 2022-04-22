import { call, put } from "redux-saga/effects";
import {
  searchUserSuccess,
  searchUserFail,
} from "../../actions/groupUser/searchUser";
import { apiService } from "../../constants/axiosInstance";
import {
  SnackbarEmitter,
  SNACKBAR_VARIANT,
  DEFAULT_MESSAGE,
} from "../../constants/snackbarController";
import { get } from "lodash";

async function doSearchUser({ info }) {
  try {
    const config = {
      url: "/search-user",
      method: "get",
      params: {
        info,
      },
    };
    const result = await apiService(config);
    return result.data;
  } catch (error) {
    throw error;
  }
}

function* searchUser(action) {
  try {
    const { member } = yield call(doSearchUser, action.options);
    yield put(searchUserSuccess({ member }, action.options));
  } catch (error) {
    yield put(searchUserFail(error, action.options));
    SnackbarEmitter(
      SNACKBAR_VARIANT.ERROR,
      get(error, "message", DEFAULT_MESSAGE.QUERY.ERROR)
    );
  }
}

export { searchUser };
