import { get } from "lodash";
import { put } from "redux-saga/effects";
import {
  defaultGroupTaskFail,
  defaultGroupTaskSuccess
} from "../../actions/groupTask/defaultGroupTask";
import {
  DEFAULT_MESSAGE,
  SnackbarEmitter,
  SNACKBAR_VARIANT
} from "../../constants/snackbarController";

function* defaultGroupTask(action) {
  try {
    yield put(defaultGroupTaskSuccess(action.payload));
    SnackbarEmitter(SNACKBAR_VARIANT.SUCCESS, DEFAULT_MESSAGE.MUTATE.SUCCESS);
  } catch (error) {
    yield put(defaultGroupTaskFail(error));
    SnackbarEmitter(
      SNACKBAR_VARIANT.ERROR,
      get(error, "message", DEFAULT_MESSAGE.MUTATE.ERROR)
    );
  }
}

export { defaultGroupTask };
