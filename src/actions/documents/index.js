import {
  CHANGE_TAB,
  FILTER_DOCUMENTS,
  SET_ALL_DATA_DOCUMENTS,
  SELECT_DOCUMENT_ITEM,
  RESET_LIST_SELECT_DOCUMENT,
  LIST_COMMENT,
  LIST_TRASH,
  LIST_MY_DOCUMENT,
  LIST_DOCUMENT_OF_FOLDER
} from '../../constants/actions/documents';
import { apiService } from '../../constants/axiosInstance';

export const changeTab = tabId => ({
  type: CHANGE_TAB,
  payload: tabId
});

export const filterDocs = filteredDocs => ({
  type: FILTER_DOCUMENTS,
  payload: filteredDocs
});

export const setAllDataDocuments = data => ({
  type: SET_ALL_DATA_DOCUMENTS,
  payload: data
});

export const selectDocumentItem = listDocumentSelected => ({
  type: SELECT_DOCUMENT_ITEM,
  payload: listDocumentSelected
});
export const resetListSelectDocument = () => ({
  type: RESET_LIST_SELECT_DOCUMENT
});

// handle for header table action
export const actionDownloadDocument = file_id => {
  const config = {
    url: '/documents/download-file',
    method: 'post',
    data: {
      file_id
    }
  };
  return apiService(config);
};

export const actionDeleteForever = document_id => {
  const config = {
    url: '/documents/delete-document-in-trash',
    method: 'post',
    data: {
      document_id
    }
  };
  return apiService(config);
};

// handle for comment of a document
export const actionFetchListComment = (fileId, quite = false) => ({
  type: LIST_COMMENT,
  quite,
  options: {
    fileId
  }
});

export const actionCreateComment = (file_id, content) => {
  const config = {
    url: '/documents/create-comment',
    method: 'post',
    data: {
      file_id,
      content
    }
  };
  return apiService(config);
};

export const actionUpdateComment = (comment_id, content) => {
  const config = {
    url: '/documents/update-comment',
    method: 'post',
    data: { comment_id, content }
  };
  return apiService(config);
};

export const actionDeleteComment = comment_id => {
  const config = {
    url: '/documents/delete-comment',
    method: 'delete',
    data: {
      comment_id
    }
  };
  return apiService(config);
};

// Handle for my document page
export const actionFetchListMyDocument = (params = {}, quite = false) => ({
  type: LIST_MY_DOCUMENT,
  quite,
  options: {
    params
  }
});

export const actionFetchDocumentOfFolder = (params = {}, quite = false) => ({
  type: LIST_DOCUMENT_OF_FOLDER,
  quite,
  options: {
    params
  }
});

// Handle for trash page
export const actionFetchListTrash = (params = {}, quite = false) => ({
  type: LIST_TRASH,
  quite,
  options: {
    params
  }
});

export const actionRenameFile = data => {
  const config = {
    url: '/documents/rename-file',
    method: 'post',
    data
  };
  return apiService(config);
};

export const actionMoveFile = (data = {}) => {
  const config = {
    url: '/documents/move-file',
    method: 'post',
    data
  };
  return apiService(config);
};

export const actionCreateFolder = (data = {}) => {
  const config = {
    url: '/documents/create-folder',
    method: 'post',
    data
  };
  return apiService(config);
};

export const actionDownloadFile = async identifier => {
  try {
    const res = await apiService({
      method: 'get',
      responseType: 'arraybuffer',
      headers: {
        'Content-Type': 'application/x-zip-compressed; charset=utf-8'
      },
      url: `api/v1/common/download/${identifier}`
    });

    const fileName = res.headers['content-disposition'] || '';
    let anchor = document.createElement('a');
    const blob = new Blob([res.data]);
    let objectUrl = window.URL.createObjectURL(blob);
    anchor.href = objectUrl;
    anchor.download = fileName.split('=').pop();
    anchor.click();
    window.URL.revokeObjectURL(objectUrl);
  } catch (error) {}
};
