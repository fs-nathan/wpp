import { createSelector } from 'reselect';

const memberProject = state => state.project.memberProject;

export const membersSelector = createSelector(
  [memberProject],
  (memberProject) => {
    const { data: { membersAdded, }, error: memberProjectError, loading: memberProjectLoading, firstTime } = memberProject;

    return {
      members: membersAdded,
      loading: firstTime ? false : memberProjectLoading,
      error: memberProjectError,
      firstTime,
    }
  }
);