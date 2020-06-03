import { get } from 'lodash';
import { call, put } from 'redux-saga/effects';
import { deleteDocumentsUserFail, deleteDocumentsUserSuccess } from '../../actions/user/deleteDocumentsUser';
import { apiService } from '../../constants/axiosInstance';
import { CustomEventEmitter, DELETE_DOCUMENTS_USER } from '../../constants/events';
import { DEFAULT_MESSAGE, SnackbarEmitter, SNACKBAR_VARIANT } from '../../constants/snackbarController';

async function doDeleteDocumentsUser({ userId, fileId }) {
  try {
    const config = {
      url: '/delete-documents-user',
      method: 'delete',
      data: {
        user_id: userId,
        file_id: fileId
      },
    }
    const result = await apiService(config);
    return result.data;
  } catch (error) {
    throw error;
  }
}

function* deleteDocumentsUser(action) {
  try {
    yield call(doDeleteDocumentsUser, action.options);
    yield put(deleteDocumentsUserSuccess(action.options));
    CustomEventEmitter(DELETE_DOCUMENTS_USER.SUCCESS);
    SnackbarEmitter(SNACKBAR_VARIANT.SUCCESS, DEFAULT_MESSAGE.MUTATE.SUCCESS);
  } catch (error) {
    yield put(deleteDocumentsUserFail(error, action.options));
    CustomEventEmitter(DELETE_DOCUMENTS_USER.FAIL);
    SnackbarEmitter(SNACKBAR_VARIANT.ERROR, get(error, 'message', DEFAULT_MESSAGE.MUTATE.ERROR));
  }
}

export { deleteDocumentsUser, };

