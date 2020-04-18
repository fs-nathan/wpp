import { createSelector } from 'reselect';

const memberProject = state => state.project.memberProject;

export const membersSelector = createSelector(
  [memberProject],
  (memberProject) => {
    const { data: { membersAdded, }, error: memberProjectError, loading: memberProjectLoading } = memberProject;

    return {
      members: membersAdded,
      loading: memberProjectLoading,
      error: memberProjectError,
    }
  }
);