import { call, put } from 'redux-saga/effects';
import { uploadDocumentsUserSuccess, uploadDocumentsUserFail } from '../../actions/user/uploadDocumentsUser';
import { apiService } from '../../constants/axiosInstance';
import { CustomEventEmitter, UPLOAD_DOCUMENTS_USER } from '../../constants/events';
import { SnackbarEmitter, SNACKBAR_VARIANT, DEFAULT_MESSAGE } from '../../constants/snackbarController';
import { get } from 'lodash';

async function doUploadDocumentsUser({ userId, file }) {
  try {
    const formData = new FormData();
    formData.append('user_id', userId);
    formData.append('file', file);
    const config = {
      url: '/upload-documents-user',
      method: 'put',
      data: formData,
    }
    const result = await apiService(config);
    return result.data;
  } catch (error) {
    throw error;
  }
}

function* uploadDocumentsUser(action) {
  try {
    const { documents } = yield call(doUploadDocumentsUser, action.options);
    yield put(uploadDocumentsUserSuccess({ documents }, action.options));
    CustomEventEmitter(UPLOAD_DOCUMENTS_USER);
    SnackbarEmitter(SNACKBAR_VARIANT.SUCCESS, DEFAULT_MESSAGE.MUTATE.SUCCESS);
  } catch (error) {
    yield put(uploadDocumentsUserFail(error, action.options));
    SnackbarEmitter(SNACKBAR_VARIANT.ERROR, get(error, 'message', DEFAULT_MESSAGE.MUTATE.ERROR));
  }
}

export {
  uploadDocumentsUser,
}
