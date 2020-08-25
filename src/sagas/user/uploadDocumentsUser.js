import { get, forEach } from 'lodash';
import { call, put } from 'redux-saga/effects';
import { uploadDocumentsUserFail, uploadDocumentsUserSuccess } from '../../actions/user/uploadDocumentsUser';
import { apiService } from '../../constants/axiosInstance';
import { CustomEventEmitter, UPLOAD_DOCUMENTS_USER } from '../../constants/events';
import { DEFAULT_MESSAGE, SnackbarEmitter, SNACKBAR_VARIANT } from '../../constants/snackbarController';

async function doUploadDocumentsUser({ userId, files, fileIds, googleData }) {
  try {
    let data;
    if (files) {
      const formData = new FormData();
      formData.append('user_id', userId);
      for (let i = 0; i < files.length; i++) {
        formData.append("file", files[i])
      }
      data = formData;
    }
    if (fileIds) {
      data = {
        user_id: userId,
        file_ids: fileIds,
      }
    }
    if (googleData) {
      let dataGoogleFiles = [];
      forEach(googleData, (item) => {
        dataGoogleFiles = dataGoogleFiles.concat({
          file_id: get(item,"id"),
          name: get(item, "name"),
          size: get(item, "rawSize"),
          file_type: get(item, "type"),
          url: get(item, "url"),
          url_download: get(item, "webContentLink")
        });
      });
      data = {
        user_id: userId,
        google_data: dataGoogleFiles,
      }
    }
    const config = {
      url: '/upload-documents-user',
      method: 'put',
      data,
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
    CustomEventEmitter(UPLOAD_DOCUMENTS_USER.SUCCESS);
    SnackbarEmitter(SNACKBAR_VARIANT.SUCCESS, DEFAULT_MESSAGE.MUTATE.SUCCESS);
  } catch (error) {
    yield put(uploadDocumentsUserFail(error, action.options));
    CustomEventEmitter(UPLOAD_DOCUMENTS_USER.FAIL);
    SnackbarEmitter(SNACKBAR_VARIANT.ERROR, get(error, 'message', DEFAULT_MESSAGE.MUTATE.ERROR));
  }
}

export { uploadDocumentsUser, };

