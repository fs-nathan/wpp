import { apiService } from '../../../../constants/axiosInstance';

export const getDocumentRecently = () => { 
  const config = {
    url: '/documents/recently',
    method: 'get',
  }
  return apiService(config);
}

export const getProjectStatic = () => { 
  const config = {
    url: '/documents/project-static',
    method: 'get',
  }
  return apiService(config);
}

export const getDocumentProjectStatic = (projectId) => { 
  const config = {
    url: '/documents/project-static',
    method: 'get',
    params: {
      project_id: projectId
    }
  }
  return apiService(config);
}

export const getDocumentShareFromMe = () => { 
  const config = {
    url: '/documents/project-static',
    method: 'get',
  }
  return apiService(config);
}