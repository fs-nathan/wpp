import { call, put } from 'redux-saga/effects';
import { copyProjectSuccess, copyProjectFail } from '../../actions/project/copyProject';
import { apiService } from '../../constants/axiosInstance';
import { CustomEventEmitter, COPY_PROJECT } from '../../constants/events';

async function doCopyProject({ projectId, name, description, startDate, isCopyMember }) {
  try {
    const config = {
      url: '/project/copy',
      method: 'post',
      data: {
        project_id: projectId,
        name,
        description,
        day_start: startDate,
        is_copy_member: isCopyMember,
      },
    }
    const result = await apiService(config);
    return result.data;
  } catch (error) {
    throw error;
  }
}

function* copyProject(action) {
  try {
    yield call(doCopyProject, action.options);
    yield put(copyProjectSuccess({}));
    CustomEventEmitter(COPY_PROJECT);
  } catch (error) {
    yield put(copyProjectFail(error));
  }
}

export {
  copyProject,
}
