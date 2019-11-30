import {
  LIST_DELETED_PROJECT,
  LIST_DELETED_PROJECT_FAIL,
  LIST_DELETED_PROJECT_SUCCESS,
} from '../../constants/actions/project/listDeletedProject';

export const listDeletedProject = ({ groupProject, status }, quite = false) => ({
  type: LIST_DELETED_PROJECT,
  quite,
  options: {
    groupProject,
    type: 'delete',
    status,
  },
});

export const listDeletedProjectSuccess = ({ projects }) => ({
  type: LIST_DELETED_PROJECT_SUCCESS,
  data: {
    projects,
  }
});

export const listDeletedProjectFail = (error) => ({
  type: LIST_DELETED_PROJECT_FAIL,
  error: error,
});