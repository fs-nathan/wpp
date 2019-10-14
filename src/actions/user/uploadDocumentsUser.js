import {
  UPLOAD_DOCUMENTS_USER,
  UPLOAD_DOCUMENTS_USER_FAIL,
  UPLOAD_DOCUMENTS_USER_SUCCESS,
} from '../../constants/actions/user/uploadDocumentsUser';

export const uploadDocumentsUser = ({ userId, file }) => ({
  type: UPLOAD_DOCUMENTS_USER,
  options: {
    userId,
    file,
  },
});

export const uploadDocumentsUserSuccess = ({ documents }) => ({
  type: UPLOAD_DOCUMENTS_USER_SUCCESS,
  data: {
    documents,
  },
});

export const uploadDocumentsUserFail = (error) => ({
  type: UPLOAD_DOCUMENTS_USER_FAIL,
  error: error,
});