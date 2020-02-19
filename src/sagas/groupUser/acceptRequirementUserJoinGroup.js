import { call, put } from 'redux-saga/effects';
import { acceptRequirementJoinGroupSuccess, acceptRequirementJoinGroupFail } from '../../actions/groupUser/acceptRequirementJoinGroup';
import { apiService } from '../../constants/axiosInstance';
import { CustomEventEmitter, ACCEPT_REQUIREMENT_USER_JOIN_GROUP } from '../../constants/events';
import { SnackbarEmitter, SNACKBAR_VARIANT, DEFAULT_MESSAGE } from '../../constants/snackbarController';
import { get } from 'lodash';

async function doAcceptRequirementJoinGroup({ requirementId }) {
  try {
    const config = {
      url: '/accept-requirement-join-group',
      method: 'post',
      data: {
        requirement_id: requirementId,
      }
    }
    const result = await apiService(config);
    return result.data;
  } catch (error) {
    throw error;
  }
}

function* acceptRequirementJoinGroup(action) {
  try {
    yield call(doAcceptRequirementJoinGroup, action.options);
    yield put(acceptRequirementJoinGroupSuccess(action.options));
    CustomEventEmitter(ACCEPT_REQUIREMENT_USER_JOIN_GROUP);
    SnackbarEmitter(SNACKBAR_VARIANT.SUCCESS, DEFAULT_MESSAGE.MUTATE.SUCCESS);
  } catch (error) {
    yield put(acceptRequirementJoinGroupFail(error, action.options));
    SnackbarEmitter(SNACKBAR_VARIANT.ERROR, get(error, 'message', DEFAULT_MESSAGE.MUTATE.ERROR));
  }
}

export {
  acceptRequirementJoinGroup,
}
