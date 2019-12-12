import * as actionTypes from '../../constants/actions/system/system';

export const actionVisibleDrawerMessage = option => {
  return {
    type: actionTypes.CHANGE_DRAWER,
    payload: option
  };
};
export const openNoticeModal = () => {
  return {
    type: actionTypes.CHANGE_NOTICE_MODAL,
    payload: true
  };
};
export const closeNoticeModal = () => {
  return {
    type: actionTypes.CHANGE_NOTICE_MODAL,
    payload: false
  };
};
export const openDocumentDetail = file => ({
  type: actionTypes.CHANGE_DOCUMENT_DETAIL,
  payload: { isOpen: true, item: file }
});
export const closeDocumentDetail = () => ({
  type: actionTypes.CHANGE_DOCUMENT_DETAIL,
  payload: { isOpen: false, item: null }
});

export const canViewFile = fileType => {
  if (!fileType) return false;
  const type = fileType.toLowerCase();
  return (
    type === 'doc' ||
    type === 'docx' ||
    type === 'xls' ||
    type === 'xlsx' ||
    type === 'pdf' ||
    type === 'jpg' ||
    type === 'jpeg' ||
    type === 'png' ||
    type === 'gif'
  );
};
