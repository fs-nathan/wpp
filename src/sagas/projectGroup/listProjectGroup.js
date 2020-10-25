import { get } from 'lodash';
import { call, put } from 'redux-saga/effects';
import { listProjectGroupFail, listProjectGroupSuccess } from '../../actions/projectGroup/listProjectGroup';
import { apiService } from '../../constants/axiosInstance';
import { CustomEventEmitter, LIST_PROJECT_GROUP } from '../../constants/events';
import { DEFAULT_MESSAGE, SnackbarEmitter, SNACKBAR_VARIANT } from '../../constants/snackbarController';

async function doListProjectGroup({timeStart, timeEnd}) {
  try {
    const config = {
      url: '/project-group/list',
      method: 'get',
      params: {
        "start_time": timeStart,
        "end_time": timeEnd
      }
    }
    const result = await apiService(config);
    return result.data;
  } catch (error) {
    throw error;
  }
}

function* listProjectGroup(action) {
  try {
    const { project_groups: projectGroups } = yield call(doListProjectGroup, action.options);
    yield put(listProjectGroupSuccess({ projectGroups }, action.options));
    CustomEventEmitter(LIST_PROJECT_GROUP.SUCCESS);
  } catch (error) {
    yield put(listProjectGroupFail(error, action.options));
    CustomEventEmitter(LIST_PROJECT_GROUP.FAIL);
    SnackbarEmitter(SNACKBAR_VARIANT.ERROR, get(error, 'message', DEFAULT_MESSAGE.QUERY.ERROR));
  }
}

export { listProjectGroup, };

