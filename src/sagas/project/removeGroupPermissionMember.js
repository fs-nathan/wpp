import { get } from 'lodash';
import { call, put } from 'redux-saga/effects';
import { removeGroupPermissionMemberFail, removeGroupPermissionMemberSuccess } from '../../actions/project/removeGroupPermissionMember';
import { apiService } from '../../constants/axiosInstance';
import { CustomEventEmitter, REMOVE_GROUP_PERMISSION_MEMBER } from '../../constants/events';
import { DEFAULT_MESSAGE, SnackbarEmitter, SNACKBAR_VARIANT } from '../../constants/snackbarController';

async function doRemoveGroupPermissionMember({ projectId, memberId, }) {
  try {
    const config = {
      url: '/project/remove-group-permission-member',
      method: 'post',
      data: {
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

function* removeGroupPermissionMember(action) {
  try {
    yield call(doRemoveGroupPermissionMember, action.options);
    yield put(removeGroupPermissionMemberSuccess(action.options));
    CustomEventEmitter(REMOVE_GROUP_PERMISSION_MEMBER.SUCCESS);
    SnackbarEmitter(SNACKBAR_VARIANT.SUCCESS, DEFAULT_MESSAGE.MUTATE.SUCCESS);
  } catch (error) {
    yield put(removeGroupPermissionMemberFail(error, action.options));
    CustomEventEmitter(REMOVE_GROUP_PERMISSION_MEMBER.FAIL);
    SnackbarEmitter(SNACKBAR_VARIANT.ERROR, get(error, 'message', DEFAULT_MESSAGE.MUTATE.ERROR));
  }
}

export { removeGroupPermissionMember, };

