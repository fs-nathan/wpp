import { createSelector } from 'reselect';

const listProjectGroup = state => state.projectGroup.listProjectGroup;

export const groupsSelector = createSelector(
  [listProjectGroup],
  (listProjectGroup) => {
    const { data: { projectGroups }, loading, error } = listProjectGroup;
    return {
      groups: projectGroups,
      loading,
      error,
    }
  }
);