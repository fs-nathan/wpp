import {
  CHANGE_TAB,
  FILTER_DOCUMENTS,
  SET_ALL_DATA_DOCUMENTS,
} from '../../constants/actions/documents'

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
})