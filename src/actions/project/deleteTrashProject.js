import { DELETE_TRASH_PROJECT, DELETE_TRASH_PROJECT_FAIL, DELETE_TRASH_PROJECT_SUCCESS } from '../../constants/actions/project/deleteTrashProject';

export const deleteTrashProject = ({ projectId }) => ({
  type: DELETE_TRASH_PROJECT,
  options: {
    projectId,
  },
});

export const deleteTrashProjectSuccess = (options) => ({
  type: DELETE_TRASH_PROJECT_SUCCESS,
  options,
});

export const deleteTrashProjectFail = (error, options) => ({
  type: DELETE_TRASH_PROJECT_FAIL,
  options,
  error,
});