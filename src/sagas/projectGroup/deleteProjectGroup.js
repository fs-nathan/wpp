import { call, put } from 'redux-saga/effects';
import { deleteProjectGroupSuccess, deleteProjectGroupFail } from '../../actions/projectGroup/deleteProjectGroup';
import { apiService } from '../../constants/axiosInstance';
import { CustomEventEmitter, DELETE_PROJECT_GROUP } from '../../constants/events';

async function doDeleteProjectGroup({ projectGroupId }) {
  try {
    const config = {
      url: '/project-group/delete',
      method: 'delete',
      data: {
        project_group_id: projectGroupId,
      },
    }
    const result = await apiService(config);
    return result.data;
  } catch (error) {
    throw error;
  }
}

function* deleteProjectGroup(action) {
  try {
    yield call(doDeleteProjectGroup, action.options);
    yield put(deleteProjectGroupSuccess());
    CustomEventEmitter(DELETE_PROJECT_GROUP);
  } catch (error) {
    yield put(deleteProjectGroupFail(error));
  }
}

export {
  deleteProjectGroup,
}
