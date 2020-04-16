import { RESTORE_TRASH_PROJECT, RESTORE_TRASH_PROJECT_FAIL, RESTORE_TRASH_PROJECT_SUCCESS } from '../../constants/actions/project/restoreTrashProject';

export const restoreTrashProject = ({ projectId }) => ({
  type: RESTORE_TRASH_PROJECT,
  options: {
    projectId,
  },
});

export const restoreTrashProjectSuccess = (options) => ({
  type: RESTORE_TRASH_PROJECT_SUCCESS,
  options,
});

export const restoreTrashProjectFail = (error, options) => ({
  type: RESTORE_TRASH_PROJECT_FAIL,
  options,
  error,
});