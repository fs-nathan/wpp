import { call, put } from 'redux-saga/effects';
import { getRequirementJoinGroupSuccess, getRequirementJoinGroupFail } from '../../actions/groupUser/getRequirementJoinGroup';
import { apiService } from '../../constants/axiosInstance';
import { SnackbarEmitter, SNACKBAR_VARIANT, DEFAULT_MESSAGE } from '../../constants/snackbarController';
import { get } from 'lodash';

async function doGetRequirementJoinGroup() {
  try {
    const config = {
      url: '/get-requirement-join-group',
      method: 'get',
    }
    const result = await apiService(config);
    return result.data;
  } catch (error) {
    throw error;
  }
}

function* getRequirementJoinGroup(action) {
  try {
    const { requirements} = yield call(doGetRequirementJoinGroup, action.options);
    yield put(getRequirementJoinGroupSuccess({ requirements }, action.options));
  } catch (error) {
    yield put(getRequirementJoinGroupFail(error, action.options));
    SnackbarEmitter(SNACKBAR_VARIANT.ERROR, get(error, 'message', DEFAULT_MESSAGE.QUERY.ERROR));
  }
}

export {
  getRequirementJoinGroup,
}
