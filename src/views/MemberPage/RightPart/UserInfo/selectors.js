import { createSelector } from 'reselect';

const detailUser = state => state.user.detailUser;
const uploadDocumentsUser = state => state.user.uploadDocumentsUser;

export const userSelector = createSelector(
  [detailUser],
  (detailUser) => {
    const { data: { user }, error, loading } = detailUser;
    return {
      user,
      loading,
      error,
    }
  }
);

export const isUploadSelector = createSelector(
  [uploadDocumentsUser],
  (uploadDocumentsUser) => {
    const { loading } = uploadDocumentsUser;
    return loading;
  }
);