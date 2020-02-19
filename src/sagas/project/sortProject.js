import { call, put } from 'redux-saga/effects';
import { sortProjectSuccess, sortProjectFail } from '../../actions/project/sortProject';
import { apiService } from '../../constants/axiosInstance';
import { CustomEventEmitter, SORT_PROJECT } from '../../constants/events';
import { SnackbarEmitter, SNACKBAR_VARIANT, DEFAULT_MESSAGE } from '../../constants/snackbarController';
import { get } from 'lodash';

async function doSortProject({ sortData, groupId, }) {
  try {
    let config = {
      method: 'post',
    }
    if (groupId !== undefined) {
      config = {
        ...config,
        url: '/project/sort-in-group',
        data: {
          sort_data: sortData.map(data => data.id),
          group_id: groupId,
        },
      }
    } else {
      config = {
        ...config,
        url: '/project/sort',
        data: {
          sort_data: sortData.map(data => data.id),
        },
      }
    }
    const result = await apiService(config);
    return result.data;
  } catch (error) {
    throw error;
  }
}

function* sortProject(action) {
  try {
    yield call(doSortProject, action.options);
    yield put(sortProjectSuccess(action.options));
    CustomEventEmitter(SORT_PROJECT);
    SnackbarEmitter(SNACKBAR_VARIANT.SUCCESS, DEFAULT_MESSAGE.MUTATE.SUCCESS);
  } catch (error) {
    yield put(sortProjectFail(error, action.options));
    SnackbarEmitter(SNACKBAR_VARIANT.ERROR, get(error, 'message', DEFAULT_MESSAGE.MUTATE.ERROR));
  }
}

export {
  sortProject,
}
