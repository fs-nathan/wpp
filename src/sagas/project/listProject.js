import { call, put } from 'redux-saga/effects';
import { listProjectSuccess, listProjectFail } from '../../actions/project/listProject';
import { listDeletedProjectSuccess, listDeletedProjectFail } from '../../actions/project/listDeletedProject';
import { apiService } from '../../constants/axiosInstance';
import { SnackbarEmitter, SNACKBAR_VARIANT, DEFAULT_MESSAGE } from '../../constants/snackbarController';
import { get } from 'lodash';

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

function* listDeletedProject(action) {
  try {
    const { projects } = yield call(doListProject, action.options);
    yield put(listDeletedProjectSuccess({ projects }));
  } catch (error) {
    yield put(listDeletedProjectFail(error));
    SnackbarEmitter(SNACKBAR_VARIANT.ERROR, get(error, 'message', DEFAULT_MESSAGE.QUERY.ERROR));
  }
}

export {
  listProject,
  listDeletedProject,
}
