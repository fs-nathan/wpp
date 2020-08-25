import { get } from 'lodash';
import { call, put } from 'redux-saga/effects';
import { addMemberProjectFail, addMemberProjectSuccess } from '../../actions/project/addMemberToProject';
import { apiService } from '../../constants/axiosInstance';
import { ADD_MEMBER_PROJECT, CustomEventEmitter } from '../../constants/events';
import { DEFAULT_MESSAGE, SnackbarEmitter, SNACKBAR_VARIANT } from '../../constants/snackbarController';

async function doAddMemberProject({ projectId, memberId, groupPermission, roles }) {
  try {
    const config = {
      url: '/project/add-member',
      method: 'post',
      data: {
        project_id: projectId,
        member_id: memberId,
        group_permission: groupPermission,
        roles,
      },
    }
    const result = await apiService(config);
    return result.data;
  } catch (error) {
    throw error;
  }
}

function* addMemberProject(action) {
  try {
    yield call(doAddMemberProject, action.options);
    yield put(addMemberProjectSuccess(action.options));
    CustomEventEmitter(ADD_MEMBER_PROJECT.SUCCESS);
    SnackbarEmitter(SNACKBAR_VARIANT.SUCCESS, DEFAULT_MESSAGE.MUTATE.SUCCESS);
  } catch (error) {
    yield put(addMemberProjectFail(error, action.options));
    CustomEventEmitter(ADD_MEMBER_PROJECT.FAIL);
    SnackbarEmitter(SNACKBAR_VARIANT.ERROR, get(error, 'message', DEFAULT_MESSAGE.MUTATE.ERROR));
  }
}

export { addMemberProject, };

