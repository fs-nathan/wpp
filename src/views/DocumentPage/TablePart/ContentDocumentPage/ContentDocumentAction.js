import { apiService } from '../../../../constants/axiosInstance';

export const getDocumentRecently = () => {
  const config = {
    url: '/documents/recently',
    method: 'get'
  };
  return apiService(config);
};

export const getProjectStatic = params => {
  const config = {
    url: '/documents/project-static',
    method: 'get',
    params
  };
  return apiService(config);
};

export const getDocumentProjectStatic = projectId => {
  const config = {
    url: '/documents/project',
    method: 'get',
    params: {
      project_id: projectId
    }
  };
  return apiService(config);
};

export const getDocumentShareFromMe = () => {
  const config = {
    url: '/documents/share-from-me',
    method: 'get'
  };
  return apiService(config);
};

export const actionFetchListFolderMoveFile = params => {
  const config = {
    url: '/documents/get-list-folder',
    method: 'get',
    params
  };
  return apiService(config);
};

export const actionFetchListFolderMoveFolder = params => {
  const config = {
    url: '/documents/get-list-folder-to-move',
    method: 'get',
    params
  };
  return apiService(config);
};
