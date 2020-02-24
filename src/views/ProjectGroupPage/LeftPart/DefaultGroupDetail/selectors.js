import { createSelector } from 'reselect';

const detailDefaultGroup = state => state.projectGroup.detailDefaultGroup;

export const groupSelector = createSelector(
  [detailDefaultGroup],
  (detailDefaultGroup) => {
    const { data: { projectGroup }, error, loading } = detailDefaultGroup;
    return {
      group: projectGroup,
      loading,
      error,
    }
  }
);