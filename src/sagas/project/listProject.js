import { call, put } from 'redux-saga/effects';
import { listProjectSuccess, listProjectFail } from '../../actions/project/listProject';
import { listDeletedProjectSuccess, listDeletedProjectFail } from '../../actions/project/listDeletedProject';
import { apiService } from '../../constants/axiosInstance';
import { SnackbarEmitter, SNACKBAR_VARIANT, DEFAULT_MESSAGE } from '../../constants/snackbarController';
import { get } from 'lodash';

async function doListProject({ groupProject, type, status }) {
  try {
    const config = {
      url: '/project/list',
      method: 'get',
      params: {
        group_project: groupProject,
        type,
        status,
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
    const { projects } = yield call(doListProject, action.options);
    yield put(listProjectSuccess({ projects }));
  } catch (error) {
    yield put(listProjectFail(error));
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
