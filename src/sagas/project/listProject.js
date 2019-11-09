import { call, put } from 'redux-saga/effects';
import { listProjectSuccess, listProjectFail } from '../../actions/project/listProject';
import { apiService } from '../../constants/axiosInstance';

async function doListProject({ groupProject, type, status }) {
  try {
    const config = {
      url: '/project/list',
      method: 'get',
      params: {
        group_project: groupProject,
        type,
        status,
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
    const { projects } = yield call(doListProject, action.options);
    yield put(listProjectSuccess({ projects }));
  } catch (error) {
    yield put(listProjectFail(error));
  }
}

export {
  listProject,
}
