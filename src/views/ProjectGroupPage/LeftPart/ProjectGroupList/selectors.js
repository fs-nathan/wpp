import { createSelector } from 'reselect';

const listProjectGroup = state => state.projectGroup.listProjectGroup;

export const groupsSelector = createSelector(
  [listProjectGroup],
  (listProjectGroup) => {
    const { data: { projectGroups }, error, loading } = listProjectGroup;
    return {
      groups: projectGroups,
      loading,
      error,
    }
  }
);