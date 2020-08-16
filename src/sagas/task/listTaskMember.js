import { get } from 'lodash';
import { call, put } from 'redux-saga/effects';
import { listTaskMemberFail, listTaskMemberSuccess } from '../../actions/task/listTaskMember';
import { apiService } from '../../constants/axiosInstance';
import { DEFAULT_MESSAGE, SnackbarEmitter, SNACKBAR_VARIANT } from '../../constants/snackbarController';

async function doListTaskMember({ projectId, memberId }) {
  try {
    const config = {
      url: '/project/list-task-member',
      method: 'get',
      params: {
        project_id: projectId,
        member_id: memberId,
      },
    }
    const result = await apiService(config);
    return result.data;
  } catch (error) {
    throw error;
  }
}

function* listTaskMember(action) {
  try {
    const { tasks } = yield call(doListTaskMember, action.options);
    yield put(listTaskMemberSuccess({ tasks }, action.options));
  } catch (error) {
    yield put(listTaskMemberFail(error, action.options));
    SnackbarEmitter(SNACKBAR_VARIANT.ERROR, get(error, 'message', DEFAULT_MESSAGE.QUERY.ERROR));
  }
}

export { listTaskMember, };
