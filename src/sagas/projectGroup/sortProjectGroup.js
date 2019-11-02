import { call, put } from 'redux-saga/effects';
import { sortProjectGroupSuccess, sortProjectGroupFail } from '../../actions/projectGroup/sortProjectGroup';
import { apiService } from '../../constants/axiosInstance';
import { CustomEventEmitter, SORT_PROJECT_GROUP } from '../../constants/events';

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
    yield put(sortProjectGroupSuccess());
    CustomEventEmitter(SORT_PROJECT_GROUP);
  } catch (error) {
    yield put(sortProjectGroupFail(error));
  }
}

export {
  sortProjectGroup,
}
