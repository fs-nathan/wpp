import { createSelector } from 'reselect';

const listProjectGroup = state => state.projectGroup.listProjectGroup;
const createProject = state => state.project.createProject;

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
  [createProject],
  (createProject) => {
    const { loading } = createProject;
    return loading;
  }
);