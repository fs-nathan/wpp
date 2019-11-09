import { call, put } from 'redux-saga/effects';
import { detailProjectSuccess, detailProjectFail } from '../../actions/project/detailProject';
import { apiService } from '../../constants/axiosInstance';

async function doDetailProject({ projectId }) {
  try {
    const config = {
      url: '/project/detail',
      method: 'get',
      params: {
        project_id: projectId,
      },
    }
    const result = await apiService(config);
    return result.data;
  } catch (error) {
    throw error;
  }
}

function* detailProject(action) {
  try {
    const { project } = yield call(doDetailProject, action.options);
    yield put(detailProjectSuccess({ project }));
  } catch (error) {
    yield put(detailProjectFail(error));
  }
}

export {
  detailProject,
}
