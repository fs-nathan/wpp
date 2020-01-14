import { call, put } from 'redux-saga/effects';
import { rejectRequirementJoinGroupSuccess, rejectRequirementJoinGroupFail } from '../../actions/groupUser/rejectRequirementJoinGroup';
import { apiService } from '../../constants/axiosInstance';
import { CustomEventEmitter, REJECT_REQUIREMENT_USER_JOIN_GROUP } from '../../constants/events';
import { SnackbarEmitter, SNACKBAR_VARIANT, DEFAULT_MESSAGE } from '../../constants/snackbarController';
import { get } from 'lodash';

async function doRejectRequirementJoinGroup({ requirementId }) {
  try {
    const config = {
      url: '/reject-requirement-join-group',
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

function* rejectRequirementJoinGroup(action) {
  try {
    const { requirements} = yield call(doRejectRequirementJoinGroup, action.options);
    yield put(rejectRequirementJoinGroupSuccess({ requirements }));
    CustomEventEmitter(REJECT_REQUIREMENT_USER_JOIN_GROUP);
    SnackbarEmitter(SNACKBAR_VARIANT.SUCCESS, DEFAULT_MESSAGE.MUTATE.SUCCESS);
  } catch (error) {
    yield put(rejectRequirementJoinGroupFail(error));
    SnackbarEmitter(SNACKBAR_VARIANT.ERROR, get(error, 'message', DEFAULT_MESSAGE.MUTATE.ERROR));
  }
}

export {
  rejectRequirementJoinGroup,
}
