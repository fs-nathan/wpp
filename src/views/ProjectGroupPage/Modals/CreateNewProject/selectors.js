import { createSelector } from 'reselect';

const listProjectGroup = state => state.projectGroup.listProjectGroup;

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