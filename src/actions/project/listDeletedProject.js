import {
  LIST_DELETED_PROJECT,
  LIST_DELETED_PROJECT_FAIL,
  LIST_DELETED_PROJECT_SUCCESS,
  LIST_DELETED_PROJECT_RESET,
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

export const listDeletedProjectSuccess = ({ projects }, options) => ({
  type: LIST_DELETED_PROJECT_SUCCESS,
  options,
  data: {
    projects,
  }
});

export const listDeletedProjectFail = (error, options) => ({
  type: LIST_DELETED_PROJECT_FAIL,
  options,
  error,
});

export const listDeletedProjectReset = () => ({
  type: LIST_DELETED_PROJECT_RESET,
});