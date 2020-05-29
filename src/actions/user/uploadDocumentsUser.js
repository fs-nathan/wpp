import { UPLOAD_DOCUMENTS_USER, UPLOAD_DOCUMENTS_USER_FAIL, UPLOAD_DOCUMENTS_USER_SUCCESS } from '../../constants/actions/user/uploadDocumentsUser';

export const uploadDocumentsUser = ({ userId, files, fileIds, googleData }) => ({
  type: UPLOAD_DOCUMENTS_USER,
  options: {
    userId,
    files,
    fileIds,
    googleData,
  },
});

export const uploadDocumentsUserSuccess = ({ documents }, options) => ({
  type: UPLOAD_DOCUMENTS_USER_SUCCESS,
  options,
  data: {
    documents,
  },
});

export const uploadDocumentsUserFail = (error, options) => ({
  type: UPLOAD_DOCUMENTS_USER_FAIL,
  options,
  error,
});