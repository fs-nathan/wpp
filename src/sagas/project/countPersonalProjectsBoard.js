import {get, size} from 'lodash';
import {call, put} from 'redux-saga/effects';
import {countPersonalProjectsBoardSuccess} from '../../actions/project/listProject';
import {apiService} from '../../constants/axiosInstance';
import {DEFAULT_MESSAGE, SNACKBAR_VARIANT, SnackbarEmitter} from '../../constants/snackbarController';

async function doListProject({ type_data }) {
  try {
    const config = {
      url: '/project/list',
      method: 'get',
      params: {
        type_data
      },
    }
    const result = await apiService(config);
    return result.data;
  } catch (error) {
    throw error;
  }
}

function* countPersonalProjectsBoard(action) {
  try {
    const { projects } = yield call(doListProject, action.options);
    yield put(countPersonalProjectsBoardSuccess({numberOfProjects: size(projects)}));
  } catch (error) {
    SnackbarEmitter(SNACKBAR_VARIANT.ERROR, get(error, 'message', DEFAULT_MESSAGE.QUERY.ERROR));
  }
}

export { countPersonalProjectsBoard };

