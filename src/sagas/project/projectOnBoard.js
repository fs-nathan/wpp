import { get } from 'lodash';
import { call, put } from 'redux-saga/effects';
import { getProjectOnPersonalBoardFail, getProjectOnPersonalBoardSuccess } from '../../actions/project/projectOnPersonalBoard';
import { apiService } from '../../constants/axiosInstance';
import { DEFAULT_MESSAGE, SnackbarEmitter, SNACKBAR_VARIANT } from '../../constants/snackbarController';

async function doGetProjectOnBoard() {
  try {
    const config = {
      url: '/project/get-project-on-personal-board',
      method: 'get',
    }
    const result = await apiService(config);
    return result.data;
  } catch (error) {
    throw error;
  }
}

function* getProjectOnBoard(action) {
  try {
    const { projects } = yield call(doGetProjectOnBoard);
    yield put(getProjectOnPersonalBoardSuccess({ projects }));
  } catch (error) {
    yield put(getProjectOnPersonalBoardFail(error));
    SnackbarEmitter(SNACKBAR_VARIANT.ERROR, get(error, 'message', DEFAULT_MESSAGE.QUERY.ERROR));
  }
}

export { getProjectOnBoard };

