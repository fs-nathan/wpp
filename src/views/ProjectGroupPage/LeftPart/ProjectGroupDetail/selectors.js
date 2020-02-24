import { createSelector } from 'reselect';

const detailProjectGroup = state => state.projectGroup.detailProjectGroup;
const memberProjectGroup = state => state.projectGroup.memberProjectGroup;

export const groupSelector = createSelector(
  [detailProjectGroup, memberProjectGroup],
  (detailProjectGroup, memberProjectGroup) => {
    const { data: { projectGroup }, error: detailProjectGroupError, loading: detailProjectGroupLoading } = detailProjectGroup;
    const { data: { members }, error: memberProjectGroupError, loading: memberProjectGroupLoading } = memberProjectGroup;
    const newGroup = {
      ...projectGroup,
      members,
    }
    return {
      group: newGroup,
      loading: detailProjectGroupLoading || memberProjectGroupLoading,
      error: detailProjectGroupError || memberProjectGroupError,
    }
  }
);