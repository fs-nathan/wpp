import { call, put } from 'redux-saga/effects';
import { detailProjectGroupSuccess, detailProjectGroupFail } from '../../actions/projectGroup/detailProjectGroup';
import { apiService } from '../../constants/axiosInstance';

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
    yield put(detailProjectGroupSuccess({ projectGroup }));
  } catch (error) {
    yield put(detailProjectGroupFail(error));
  }
}

export {
  detailProjectGroup,
}