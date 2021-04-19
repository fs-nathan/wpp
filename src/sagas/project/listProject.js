import {get} from 'lodash';
import {call, put} from 'redux-saga/effects';
import {listDeletedProjectFail, listDeletedProjectSuccess} from '../../actions/project/listDeletedProject';
import {listProjectFail, listProjectForSelectSuccess, listProjectSuccess} from '../../actions/project/listProject';
import {apiService} from '../../constants/axiosInstance';
import {CustomEventEmitter, LIST_PROJECT} from '../../constants/events';
import {DEFAULT_MESSAGE, SNACKBAR_VARIANT, SnackbarEmitter} from '../../constants/snackbarController';

async function doListProject({ groupProject, type, status, timeStart, timeEnd, type_data }) {
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
        type_data
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
    if(action.options.isForSelect) {
      yield put(listProjectForSelectSuccess({ projects }));
    } else yield put(listProjectSuccess({ projects, summary }, action.options));
    CustomEventEmitter(LIST_PROJECT.SUCCESS);
  } catch (error) {
    yield put(listProjectFail(error, action.options));
    CustomEventEmitter(LIST_PROJECT.FAIL);
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

