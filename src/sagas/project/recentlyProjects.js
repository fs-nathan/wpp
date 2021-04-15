import { get } from 'lodash';
import { call, put } from 'redux-saga/effects';
import { getProjectRecentlyFail, getProjectRecentlySuccess } from '../../actions/project/recentlyProjects';
import { apiService } from '../../constants/axiosInstance';
import { DEFAULT_MESSAGE, SnackbarEmitter, SNACKBAR_VARIANT } from '../../constants/snackbarController';

async function doGetRecentlyProjects() {
  try {
    const config = {
      url: '/project/get-recently-project',
      method: 'get',
    }
    const result = await apiService(config);
    return result.data;
  } catch (error) {
    throw error;
  }
}

function* recentlyProjects(action) {
  try {
    const { projects } = yield call(doGetRecentlyProjects);
    yield put(getProjectRecentlySuccess({ projects }));
  } catch (error) {
    yield put(getProjectRecentlyFail(error));
    SnackbarEmitter(SNACKBAR_VARIANT.ERROR, get(error, 'message', DEFAULT_MESSAGE.QUERY.ERROR));
  }
}

export { recentlyProjects};

