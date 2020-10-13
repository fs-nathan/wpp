import { get } from 'lodash';
import { call, put } from 'redux-saga/effects';
import { detailProjectFail, detailProjectSuccess } from 'actions/kanban/detailProject';
import { apiService } from 'constants/axiosInstance';
import { CustomEventEmitter, KANBAN } from 'constants/events';
import { DEFAULT_MESSAGE, SnackbarEmitter, SNACKBAR_VARIANT } from 'constants/snackbarController';

async function doDetailProject({ projectId }) {
  try {
    const configDetail = {
      url: '/gantt/project-detail',
      method: 'get',
      params: {
        project_id: projectId,
      },
    };
    const configWorkTypes = {
      url: '/project/get-work-type',
      method: 'get',
      params: {
        project_id: projectId,
      },
    };
    const [detailRes, workTypeRes] = await Promise.all([
      apiService(configDetail), 
      apiService(configWorkTypes),
    ]);
    return ({
      state: detailRes.data.state && workTypeRes.data.state,
      project: {
        ...detailRes.data.project,
        work_type: workTypeRes.data.work_type,
      }
    });
  } catch (error) {
    throw error;
  }
}

function* detailProject(action) {
  try {
    const { project } = yield call(doDetailProject, action.options);
    yield put(detailProjectSuccess({ project }, action.options));
    CustomEventEmitter(KANBAN.DETAIL_PROJECT.SUCCESS);
  } catch (error) {
    yield put(detailProjectFail(error, action.options));
    CustomEventEmitter(KANBAN.DETAIL_PROJECT.FAIL);
    SnackbarEmitter(SNACKBAR_VARIANT.ERROR, get(error, 'message', DEFAULT_MESSAGE.QUERY.ERROR));
  }
}

export { detailProject, };

