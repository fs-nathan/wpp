import { get } from 'lodash';
import { call, put } from 'redux-saga/effects';
import { detailProjectGroupFail, detailProjectGroupSuccess } from '../../actions/projectGroup/detailProjectGroup';
import { apiService } from '../../constants/axiosInstance';
import { CustomEventEmitter, DETAIL_PROJECT_GROUP } from '../../constants/events';
import { DEFAULT_MESSAGE, SnackbarEmitter, SNACKBAR_VARIANT } from '../../constants/snackbarController';

async function doDetailProjectGroup({ projectGroupId }) {
  try {
    const config = {
      url: '/project-group/detail',
      method: 'get',
      params: {
        project_group_id: projectGroupId,
      }
    }
    const result = await apiService(config);
    return result.data;
  } catch (error) {
    throw error;
  }
}

function* detailProjectGroup(action) {
  try {
    const { project_group: projectGroup } = yield call(doDetailProjectGroup, action.options);
    yield put(detailProjectGroupSuccess({ projectGroup }, action.options));
    CustomEventEmitter(DETAIL_PROJECT_GROUP.SUCCESS);
  } catch (error) {
    yield put(detailProjectGroupFail(error, action.options));
    CustomEventEmitter(DETAIL_PROJECT_GROUP.FAIL);
    SnackbarEmitter(SNACKBAR_VARIANT.ERROR, get(error, 'message', DEFAULT_MESSAGE.QUERY.ERROR));
  }
}

export { detailProjectGroup, };

