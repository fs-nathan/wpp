import { createSelector } from 'reselect';

const memberProject = state => state.project.memberProject;

export const membersSelector = createSelector(
  [memberProject],
  (memberProject) => {
    const { data: { membersAdded, }, error, loading } = memberProject;
    return {
      members: membersAdded,
      loading,
      error,
    }
  }
);