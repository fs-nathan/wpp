import { DELETE_DOCUMENTS_USER, DELETE_DOCUMENTS_USER_FAIL, DELETE_DOCUMENTS_USER_SUCCESS } from '../../constants/actions/user/deleteDocumentsUser';

export const deleteDocumentsUser = ({ userId, fileId }) => ({
  type: DELETE_DOCUMENTS_USER,
  options: {
    userId,
    fileId,
  },
});

export const deleteDocumentsUserSuccess = (options) => ({
  type: DELETE_DOCUMENTS_USER_SUCCESS,
  options,
});

export const deleteDocumentsUserFail = (error, options) => ({
  type: DELETE_DOCUMENTS_USER_FAIL,
  options,
  error,
});