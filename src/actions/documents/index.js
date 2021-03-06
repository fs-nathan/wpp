import {
  CHANGE_TAB,
  FILTER_DOCUMENTS,
  SET_ALL_DATA_DOCUMENTS,
  SELECT_DOCUMENT_ITEM,
  RESET_LIST_SELECT_DOCUMENT,
  LIST_COMMENT,
  LIST_TRASH,
  LIST_MY_DOCUMENT,
  ACTION_SELECTED_FOLDER,
  LIST_TRASH_SUCCESS,
  LIST_MY_DOCUMENT_SUCCESS,
  LIST_RECENT,
  LIST_RECENT_SUCCESS,
  LIST_PROJECT_DOCUMENT,
  LIST_PROJECT_DOCUMENT_SUCCESS,
  LIST_PROJECT_DOCUMENT_OF_FOLDER,
  LIST_DOCUMENT_FROM_ME,
  LIST_DOCUMENT_FROM_ME_SUCCESS,
  CHANGE_SEARCH_TEXT,
  LIST_DOCUMENT_SHARE,
  LIST_DOCUMENT_SHARE_SUCCESS,
  TOGGLE_BUTTON_SIGNOUT_GOOGLE,
  LIST_GOOGLE_DOCUMENT, LIST_TASK_DOCUMENT_OF_PROJECT
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

export const toggleSingoutGoogle = (isShow = false) => ({
  type: TOGGLE_BUTTON_SIGNOUT_GOOGLE,
  payload: isShow
});

// handle for header table action
export const actionDownloadDocument = async url_file => {
  const config = {
    url: url_file,
    method: 'get',
    responseType: 'blob',
    headers: {
      'Content-Type': 'application/octet-stream; charset=utf-8'
    }
  };
  const res = await apiService(config);
  console.log(res.data);
  const fileName = res.headers['content-disposition'] || '';
  let anchor = document.createElement('a');
  const blob = new Blob([res.data]);
  let objectUrl = window.URL.createObjectURL(blob);
  anchor.href = objectUrl;
  anchor.download = fileName.split('=').pop();
  anchor.click();
  window.URL.revokeObjectURL(objectUrl);
};

export const actionDeleteFileTrash = data => {
  const config = {
    url: '/documents/trash/delete-files',
    method: 'post',
    data
  };
  return apiService(config);
};

export const actionDeleteFolderTrash = data => {
  const config = {
    url: '/documents/trash/delete-folders',
    method: 'post',
    data
  };
  return apiService(config);
};
export const actionDeletePermantly = data => {
  return apiService({
    url: '/documents/trash/delete-documents',
    method: 'post',
    data
  });
};

// handle for comment of a document
export const actionFetchListComment = (
  fileId,
  quite = false,
  page = 1,
  isLoadMore = false
) => ({
  type: LIST_COMMENT,
  quite,
  options: {
    fileId,
    page,
    isLoadMore
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

export const actionLockComment = file_id => {
  const config = {
    url: '/documents/lock-comment-file',
    method: 'post',
    data: { file_id }
  };
  return apiService(config);
};

export const actionUnLockComment = file_id => {
  const config = {
    url: '/documents/un-lock-comment-file',
    method: 'post',
    data: { file_id }
  };
  return apiService(config);
};

export const actionDeleteAllComment = file_id => {
  const config = {
    url: '/documents/delete-all-comment',
    method: 'delete',
    data: {
      file_id
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

// Handle for recent page
export const actionFetchListRecent = (params = {}, quite = false) => ({
  type: LIST_RECENT,
  quite,
  options: {
    params
  }
});

export const actionSortListRecent = newData => ({
  type: LIST_RECENT_SUCCESS,
  payload: newData
});

// Handle for project page
export const actionFetchListProject = (params = {}, quite = false) => ({
  type: LIST_PROJECT_DOCUMENT,
  quite,
  options: {
    params
  }
});

export const actionFetchListTaskOfProject = (params = {}, quite = false) => ({
  type: LIST_TASK_DOCUMENT_OF_PROJECT,
  quite,
  options: {
    params
  }
});

export const actionSortListProject = newData => ({
  type: LIST_PROJECT_DOCUMENT_SUCCESS,
  payload: newData
});

export const actionFetchListProjectOfFolder = (params = {}, quite = false) => ({
  type: LIST_PROJECT_DOCUMENT_OF_FOLDER,
  quite,
  options: {
    params
  }
});

// Handle for document share from me page
export const actionFetchListDocumentFromMe = (params = {}, quite = false) => ({
  type: LIST_DOCUMENT_FROM_ME,
  quite,
  options: {
    params
  }
});

export const actionSortListDocumentFromMe = newData => ({
  type: LIST_DOCUMENT_FROM_ME_SUCCESS,
  payload: newData
});

// Handle for document share page
export const actionFetchListDocumentShare = (params = {}, quite = false) => ({
  type: LIST_DOCUMENT_SHARE,
  quite,
  options: {
    params
  }
});

export const actionSortListDocumentShare = newData => ({
  type: LIST_DOCUMENT_SHARE_SUCCESS,
  payload: newData
});

// Handle for my document page
export const actionFetchListMyDocument = (params = {}, quite = false) => ({
  type: LIST_MY_DOCUMENT,
  quite,
  options: {
    params
  }
});

export const actionSortListDocument = newData => ({
  type: LIST_MY_DOCUMENT_SUCCESS,
  payload: newData
});

// Handle for Google drive page
export const actionFetchListGoogleDocument = (params = {}, quite = false) => ({
  type: LIST_GOOGLE_DOCUMENT,
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
export const actionSortListTrash = newData => ({
  type: LIST_TRASH_SUCCESS,
  payload: newData
});
export const actionRenameFile = data => {
  const config = {
    url: '/documents/rename-file',
    method: 'post',
    data
  };
  return apiService(config);
};
export const actionRenameFolder = data => {
  const config = {
    url: '/documents/rename-folder',
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

export const actionMoveFolder = (data = {}) => {
  const config = {
    url: '/documents/move-folder',
    method: 'post',
    data
  };
  return apiService(config);
};

export const actionMoveFolderToRoot = (data = {}) => {
  const config = {
    url: '/documents/move-folder-to-root',
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

export const actionSelectedFolder = (folder = {}) => ({
  type: ACTION_SELECTED_FOLDER,
  payload: folder
});

export const actionUploadFile = (formData, onUploading) => {
  const config = {
    url: '/documents/upload-files',
    method: 'post',
    data: formData,
    onUploadProgress: progressEvent => {
      let perrcent = (progressEvent.loaded / progressEvent.total) * 100;
      onUploading(perrcent);
    }
  };
  return apiService(config);
};
export const actionChangeSearchText = text => ({
  type: CHANGE_SEARCH_TEXT,
  payload: text
});
export const getDocumentDetail = params => {
  const config = {
    url: '/documents/detail-file',
    method: 'get',
    params
  };
  return apiService(config);
};
export const actionDeleteFile = data => {
  const config = {
    url: '/documents/delete-file',
    method: 'post',
    data
  };
  return apiService(config);
};
export const actionDeleteFolder = data => {
  const config = {
    url: '/documents/delete-folder',
    method: 'delete',
    data
  };
  return apiService(config);
};
// Handle share File and Folder
export const actionGetMemberCanShare = (params, fileType) => {
  let url = '/documents/get-member-not-share-of-file';
  if (fileType === 'folder') {
    url = '/documents/get-member-not-share-of-folder';
  }
  const config = {
    url,
    method: 'get',
    params
  };
  return apiService(config);
};

export const actionGetMemberShared = (params, fileType) => {
  let url = '/documents/get-member-shared-of-file';
  if (fileType === 'folder') {
    url = '/documents/get-member-shared-of-folder';
  }
  const config = {
    url,
    method: 'get',
    params
  };
  return apiService(config);
};

export const actionShareFile = (data, fileType) => {
  let url = '/documents/share-file';
  if (fileType === 'folder') {
    url = '/documents/share-folder';
  }
  const config = {
    url,
    method: 'post',
    data
  };
  return apiService(config);
};

export const actionCancelShareFile = (data, fileType) => {
  let url = '/documents/cancel-share-file';
  if (fileType === 'folder') {
    url = '/documents/cancel-share-folder';
  }
  const config = {
    url,
    method: 'post',
    data
  };
  return apiService(config);
};

// Handle share google file
export const getMemberShareGoogleFile = params => {
  const config = {
    url: '/documents/google-driver/get-member-not-share-of-file',
    method: 'get',
    params
  };
  return apiService(config);
};

export const getMemberSharedGoogleFile = params => {
  const config = {
    url: '/documents/google-driver/get-member-shared-of-file',
    method: 'get',
    params
  };
  return apiService(config);
};

export const actionShareGoogleFile = data => {
  const config = {
    url: '/documents/google-driver/share-file-google-driver',
    method: 'post',
    data
  };
  return apiService(config);
};

export const actionCancelShareGoogleFile = data => {
  const config = {
    url: '/documents/google-driver/cancel-share-file',
    method: 'post',
    data
  };
  return apiService(config);
};

export const updateDocumentInfo = data => {
  const config = {
    url: '/documents/update-infomation-file',
    method: 'post',
    data
  };
  return apiService(config);
};
export const deleteDocumentInfo = data => {
  const config = {
    url: '/documents/delete-infomation-file',
    method: 'delete',
    data
  };
  return apiService(config);
};
export const actionViewFile = file_id => {
  return apiService({
    url: '/documents/view-file',
    method: 'post',
    data: { file_id }
  });
};
export const actionDownloadFile = async file => {
  try {
    const { data } = await apiService({
      url: '/documents/download-file',
      method: 'post',
      data: { file_id: file.id }
    });
    let link = document.createElement('a');
    link.download = file.name;
    link.href = data.url;
    link.target = '_blank';
    link.click();
  } catch (error) {}
};

//-- handle for Document modal
export const getListMyDocument = (params = {}) => {
  return apiService({
    url: '/documents/my-document',
    method: 'get',
    params
  });
};

export const getDocumentSharedToMe = (params = {}) => {
  return apiService({
    url: '/documents/share-to-me',
    method: 'get',
    params
  });
};

export const getListProject = (params = {}) => {
  return apiService({
    url: '/documents/project-static',
    method: 'get',
    params
  });
};

export const getDocumentOfProject = (params = {}) => {
  return apiService({
    url: '/documents/project',
    method: 'get',
    params
  });
};
