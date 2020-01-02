import { apiService } from '../../constants/axiosInstance';
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
  const listExtensionFile =
    'jpg,jpeg,png,gif,tiff,bmp,webm,txt,mpeg4,3gpp,mov,avi,mpegps,wmv,flv,txt,css,html,php,c,cpp,h,hpp,js,doc,docx,xls,xlsx,ppt,pptx,pdf,pages,ai,psd,dxf,svg,eps,ps,ttf,xps,zip,rar';
  return listExtensionFile.split(',').indexOf(type) > -1;
};

export const isImageFile = fileType => {
  if (!fileType) return false;
  const type = fileType.toLowerCase();
  const listExtensionFile = 'jpg,jpeg,png,gif';
  return listExtensionFile.split(',').indexOf(type) > -1;
};

export const actionChangeBreadCrumbs = breadCrumbs => {
  return {
    type: actionTypes.CHANGE_DOCUMENT_BREAD_CRUMBS,
    payload: breadCrumbs
  };
};

export const convertBase64ToBlob = (b64Data, contentType = '') => {
  const byteCharacters = window.atob(b64Data.split(',')[1]);

  const byteNumbers = new Array(byteCharacters.length);
  for (let i = 0; i < byteCharacters.length; i += 1) {
    byteNumbers[i] = byteCharacters.charCodeAt(i);
  }

  const byteArray = new Uint8Array(byteNumbers);

  const blob = new Blob([byteArray], { type: contentType });
  return blob;
};

export const convertUrlToBlob = (
  fileUrl,
  contentType = 'image/png',
  successCallback,
  failCallback
) => {
  let img = new Image();
  if (failCallback) {
    img.onerror = function onError() {
      failCallback();
    };
  }

  img.onload = function onload() {
    var canvas = document.createElement('canvas');
    canvas.width = img.width;
    canvas.height = img.height;

    let ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

    canvas.toBlob(function(blob) {
      if (successCallback) {
        successCallback(blob);
      }
    }, contentType);
  };

  img.src = fileUrl;
};

export const formatBytes = (bytes, decimals = 2) => {
  if (!bytes) return '0 Bytes';
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
};
export const getProfileService = () => {
  const config = {
    url: '/get-profile',
    method: 'get'
  };
  return apiService(config);
};
export const actionGetProfile = data => {
  return {
    type: actionTypes.GET_PROFILE,
    payload: data
  };
};
