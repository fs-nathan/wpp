import { call, put } from 'redux-saga/effects';
import { sortProjectGroupSuccess, sortProjectGroupFail } from '../../actions/projectGroup/sortProjectGroup';
import { apiService } from '../../constants/axiosInstance';
import { CustomEventEmitter, SORT_PROJECT_GROUP } from '../../constants/events';
import { SnackbarEmitter, SNACKBAR_VARIANT, DEFAULT_MESSAGE } from '../../constants/snackbarController';
import { get } from 'lodash';

async function doSortProjectGroup({ projectGroupId, sortIndex }) {
  try {
    const config = {
      url: '/project-group/sort',
      method: 'post',
      data: {
        project_group_id: projectGroupId,
        sort_index: sortIndex,
      },
    }
    const result = await apiService(config);
    return result.data;
  } catch (error) {
    throw error;
  }
}

function* sortProjectGroup(action) {
  try {
    yield call(doSortProjectGroup, action.options);
    yield put(sortProjectGroupSuccess(action.options));
    CustomEventEmitter(SORT_PROJECT_GROUP);
    SnackbarEmitter(SNACKBAR_VARIANT.SUCCESS, DEFAULT_MESSAGE.MUTATE.SUCCESS);
  } catch (error) {
    yield put(sortProjectGroupFail(error, action.options));
    SnackbarEmitter(SNACKBAR_VARIANT.ERROR, get(error, 'message', DEFAULT_MESSAGE.MUTATE.ERROR));
  }
}

export {
  sortProjectGroup,
}
