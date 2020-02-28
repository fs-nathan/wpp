import { createSelector } from 'reselect';

const memberProject = state => state.project.memberProject;
const addMemberProject = state => state.project.addMemberProject;

export const membersSelector = createSelector(
  [memberProject],
  (memberProject) => {
    const { data: { membersAdded, membersFree }, loading, error } = memberProject;
    return {
      added: membersAdded,
      free: membersFree,
      loading,
      error,
    }
  }
);

export const addMemberSelector = createSelector(
  [addMemberProject],
  (addMemberProject) => {
    const { loading, error } = addMemberProject;
    return {
      loading,
      error,
    }
  }
);