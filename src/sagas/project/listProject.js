import { get } from 'lodash';
import { call, put } from 'redux-saga/effects';
import { listDeletedProjectFail, listDeletedProjectSuccess } from '../../actions/project/listDeletedProject';
import { listProjectFail, listProjectSuccess } from '../../actions/project/listProject';
import { apiService } from '../../constants/axiosInstance';
import { DEFAULT_MESSAGE, SnackbarEmitter, SNACKBAR_VARIANT } from '../../constants/snackbarController';

async function doListProject({ groupProject, type, status, timeStart, timeEnd }) {
  try {
    const config = {
      url: '/project/list',
      method: 'get',
      params: {
        group_project: groupProject,
        type,
        status,
        time_start: timeStart,
        time_end: timeEnd,
      },
    }
    const result = await apiService(config);
    return result.data;
  } catch (error) {
    throw error;
  }
}

function* listProject(action) {
  try {
    const { projects, summary } = yield call(doListProject, action.options);
    yield put(listProjectSuccess({ projects, summary }, action.options));
  } catch (error) {
    yield put(listProjectFail(error, action.options));
    SnackbarEmitter(SNACKBAR_VARIANT.ERROR, get(error, 'message', DEFAULT_MESSAGE.QUERY.ERROR));
  }
}

async function doListDeletedProject() {
  try {
    const config = {
      url: '/project/list-project-in-trash',
      method: 'get',
    }
    const result = await apiService(config);
    return result.data;
  } catch (error) {
    throw error;
  }
}

function* listDeletedProject(action) {
  try {
    const { projects } = yield call(doListDeletedProject, action.options);
    yield put(listDeletedProjectSuccess({ projects }, action.options));
  } catch (error) {
    yield put(listDeletedProjectFail(error), action.options);
    SnackbarEmitter(SNACKBAR_VARIANT.ERROR, get(error, 'message', DEFAULT_MESSAGE.QUERY.ERROR));
  }
}

export { listProject, listDeletedProject, };

