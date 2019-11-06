import { call, put } from 'redux-saga/effects';
import { listProjectGroupSuccess, listProjectGroupFail } from '../../actions/projectGroup/listProjectGroup';
import { apiService } from '../../constants/axiosInstance';

async function doListProjectGroup() {
  try {
    const config = {
      url: '/project-group/list',
      method: 'get',
    }
    const result = await apiService(config);
    return result.data;
  } catch (error) {
    throw error;
  }
}

function* listProjectGroup() {
  try {
    const { project_groups: projectGroups } = yield call(doListProjectGroup);
    yield put(listProjectGroupSuccess({ projectGroups }));
  } catch (error) {
    yield put(listProjectGroupFail(error));
  }
}

export {
  listProjectGroup,
}
