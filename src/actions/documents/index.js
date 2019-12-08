import {
  CHANGE_TAB,
  FILTER_DOCUMENTS,
  SET_ALL_DATA_DOCUMENTS,
  SELECT_DOCUMENT_ITEM,
  RESET_LIST_SELECT_DOCUMENT
} from '../../constants/actions/documents';

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
