import { createSelector } from 'reselect';

const listDeletedProject = state => state.project.listDeletedProject;
const deleteTrashProject = state => state.project.deleteTrashProject;
const restoreTrashProject = state => state.project.restoreTrashProject;

export const projectsSelector = createSelector(
  [listDeletedProject],
  (listDeletedProject) => {
    const { data: { projects }, loading, error, firstTime } = listDeletedProject;
    return {
      projects,
      loading: firstTime ? false : loading,
      error,
      firstTime,
    }
  }
);

export const pendingsSelector = createSelector(
  [deleteTrashProject, restoreTrashProject],
  (deleteTrashProject, restoreTrashProject) => {
    const { pendings: deletePendings, erorr: deleteError } = deleteTrashProject;
    const { pendings: restorePendings, erorr: restoreError } = restoreTrashProject;
    return {
      deletePendings,
      restorePendings,
      error: deleteError || restoreError,
    }
  }
)