import { createSelector } from 'reselect';

const memberProject = state => state.project.memberProject;

export const membersSelector = createSelector(
  [memberProject],
  (memberProject) => {
    const { data: { membersAdded, totalTask }, error: memberProjectError, loading: memberProjectLoading, firstTime } = memberProject;

    return {
      members: membersAdded,
      totalTask,
      loading: firstTime ? false : memberProjectLoading,
      error: memberProjectError,
      firstTime,
    }
  }
);