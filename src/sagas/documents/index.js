import { call, put } from 'redux-saga/effects';
import {
  DOCUMENT_HIDE_LOADING,
  LIST_COMMENT_SUCCESS,
  LIST_TRASH_SUCCESS,
  LIST_MY_DOCUMENT_SUCCESS,
  LIST_DOCUMENT_OF_FOLDER_SUCCESS
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

async function doDocumentOfFolder({ params }) {
  try {
    const config = {
      url: '/documents/document-folder',
      method: 'get',
      params
    };
    const result = await apiService(config);
    return result.data;
  } catch (error) {
    throw error;
  }
}

function* listDocumentOfFolder(action) {
  try {
    const { documents } = yield call(doDocumentOfFolder, action.options);

    yield put({
      type: LIST_DOCUMENT_OF_FOLDER_SUCCESS,
      payload: documents || []
    });
  } catch (error) {
    yield put({ type: DOCUMENT_HIDE_LOADING });
  }
}

export { listComment, listTrash, listMyDocument, listDocumentOfFolder };
