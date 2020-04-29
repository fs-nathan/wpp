import { createSelector } from 'reselect';

const listProjectGroup = state => state.projectGroup.listProjectGroup;
const updateProject = state => state.project.updateProject;

export const groupsSelector = createSelector(
  [listProjectGroup],
  (listProjectGroup) => {
    const { data: { projectGroups }, loading, error, firstTime } = listProjectGroup;
    return {
      groups: projectGroups,
      loading: firstTime ? false : loading,
      error,
      firstTime,
    }
  }
);

export const activeLoadingSelector = createSelector(
  [updateProject],
  (updateProject) => {
    const { loading } = updateProject;
    return loading;
  }
);