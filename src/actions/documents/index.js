import {
  FILTER_DOCUMENTS,
  SET_ALL_DATA_DOCUMENTS
} from '../../constants/actions/documents';

export const filterDocs = (filteredDocs) => ({
  type: FILTER_DOCUMENTS,
  payload: filteredDocs
});

export const setAllDataDocuments = data => ({
  type: SET_ALL_DATA_DOCUMENTS,
  payload: data
})