import { call, put } from 'redux-saga/effects';
import {
  DOCUMENT_HIDE_LOADING,
  LIST_COMMENT_SUCCESS,
  LIST_TRASH_SUCCESS,
  LIST_RECENT_SUCCESS,
  LIST_MY_DOCUMENT_SUCCESS,
  LIST_PROJECT_DOCUMENT_SUCCESS,
  LIST_PROJECT_DOCUMENT_OF_FOLDER_SUCCESS,
  LIST_DOCUMENT_FROM_ME_SUCCESS,
  LIST_DOCUMENT_SHARE_SUCCESS,
  LIST_GOOGLE_DOCUMENT_SUCCESS
} from '../../constants/actions/documents';
import { apiService } from '../../constants/axiosInstance';

async function doListComment({ fileId }) {
  try {
    const config = {
      url: '/documents/list-comment',
      method: 'get',
      params: {
        file_id: fileId
      }
    };
    const result = await apiService(config);
    return result.data;
  } catch (error) {
    throw error;
  }
}

function* listComment(action) {
  try {
    const { comments } = yield call(doListComment, action.options);
    yield put({ type: LIST_COMMENT_SUCCESS, payload: comments || [] });
  } catch (error) {
    yield put({ type: DOCUMENT_HIDE_LOADING });
  }
}

async function doListTrash({ params }) {
  try {
    const config = {
      url: '/documents/trash',
      method: 'get',
      params
    };
    const result = await apiService(config);
    return result.data;
  } catch (error) {
    throw error;
  }
}

function* listTrash(action) {
  try {
    const { documents } = yield call(doListTrash, action.options);
    yield put({ type: LIST_TRASH_SUCCESS, payload: documents || [] });
  } catch (error) {
    yield put({ type: DOCUMENT_HIDE_LOADING });
  }
}

async function doListRecent({ params }) {
  try {
    const config = {
      url: '/documents/recently',
      method: 'get',
      params
    };
    const result = await apiService(config);
    return result.data;
  } catch (error) {
    throw error;
  }
}

function* listRecent(action) {
  try {
    const { files } = yield call(doListRecent, action.options);
    yield put({ type: LIST_RECENT_SUCCESS, payload: files || [] });
  } catch (error) {
    yield put({ type: DOCUMENT_HIDE_LOADING });
  }
}

async function doListProject({ params }) {
  try {
    const config = {
      url: '/documents/project-static',
      method: 'get',
      params
    };
    const result = await apiService(config);
    return result.data;
  } catch (error) {
    throw error;
  }
}

function* listProjectDocument(action) {
  try {
    const { projects } = yield call(doListProject, action.options);
    yield put({ type: LIST_PROJECT_DOCUMENT_SUCCESS, payload: projects || [] });
  } catch (error) {
    yield put({ type: DOCUMENT_HIDE_LOADING });
  }
}

async function doListProjectOfFolder({ params }) {
  try {
    const config = {
      url: '/documents/project',
      method: 'get',
      params
    };
    const result = await apiService(config);
    return result.data;
  } catch (error) {
    throw error;
  }
}

function* listProjectDocumentOfFolder(action) {
  try {
    const { documents } = yield call(doListProjectOfFolder, action.options);
    yield put({
      type: LIST_PROJECT_DOCUMENT_OF_FOLDER_SUCCESS,
      payload: documents || []
    });
  } catch (error) {
    yield put({ type: DOCUMENT_HIDE_LOADING });
  }
}

async function doListDocumentShareFromMe({ params }) {
  try {
    const config = {
      url: '/documents/share-from-me',
      method: 'get',
      params
    };
    const result = await apiService(config);
    return result.data;
  } catch (error) {
    throw error;
  }
}

function* listDocumentShareFromMe(action) {
  try {
    const { documents } = yield call(doListDocumentShareFromMe, action.options);
    yield put({
      type: LIST_DOCUMENT_FROM_ME_SUCCESS,
      payload: documents || []
    });
  } catch (error) {
    yield put({ type: DOCUMENT_HIDE_LOADING });
  }
}

async function doListDocumentShare({ params }) {
  try {
    const config = {
      url: '/documents/share-to-me',
      method: 'get',
      params
    };
    const result = await apiService(config);
    return result.data;
  } catch (error) {
    throw error;
  }
}

function* listDocumentShare(action) {
  try {
    const { documents } = yield call(doListDocumentShare, action.options);
    yield put({
      type: LIST_DOCUMENT_SHARE_SUCCESS,
      payload: documents || []
    });
  } catch (error) {
    yield put({ type: DOCUMENT_HIDE_LOADING });
  }
}

async function doListMyDocument({ params }) {
  try {
    const config = {
      url: '/documents/my-document',
      method: 'get',
      params
    };
    const result = await apiService(config);
    return result.data;
  } catch (error) {
    throw error;
  }
}

function* listMyDocument(action) {
  try {
    const { folders, documents } = yield call(doListMyDocument, action.options);
    let tranformData = [];
    if (folders.length > 0) {
      tranformData = folders.map(item => ({ ...item, type: 'folder' }));
    }
    if (documents.length > 0) {
      tranformData = tranformData.concat(documents);
    }
    yield put({ type: LIST_MY_DOCUMENT_SUCCESS, payload: tranformData || [] });
  } catch (error) {
    yield put({ type: DOCUMENT_HIDE_LOADING });
  }
}

var pageToken = null;
function doListGoogleDocument({ params }) {
  try {
    if (
      window.gapi &&
      window.gapi.client &&
      window.gapi.client.drive &&
      window.gapi.client.drive.files
    ) {
      return window.gapi.client.drive.files.list({
        // q: `"${params.folderId || 'root'}" in parents and trashed = false or sharedWithMe`,
        q: `"${params.folderId || 'root'}" in parents and trashed = false`,
        spaces: 'drive',
        orderBy: 'folder',
        pageSize: 1000,
        fields:
          'nextPageToken, files(id, name, fileExtension, mimeType, owners, createdTime, modifiedTime, size, webViewLink, iconLink, webContentLink)',
        // pageToken: pageToken,
        ...params
      });
    }
  } catch (error) {
    throw error;
  }
}

function* listGoogleDocument(action) {
  try {
    const { result } = yield call(doListGoogleDocument, action.options);
    pageToken = result.nextPageToken;
    console.log(pageToken);

    yield put({
      type: LIST_GOOGLE_DOCUMENT_SUCCESS,
      payload: result.files || []
    });
  } catch (error) {
    yield put({ type: DOCUMENT_HIDE_LOADING });
  }
}

export {
  listComment,
  listTrash,
  listMyDocument,
  listRecent,
  listProjectDocument,
  listProjectDocumentOfFolder,
  listDocumentShareFromMe,
  listDocumentShare,
  listGoogleDocument
};
