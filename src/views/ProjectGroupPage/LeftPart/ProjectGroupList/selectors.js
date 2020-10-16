import {createSelector} from 'reselect';

const listProjectGroup = state => state.projectGroup.listProjectGroup;
const sortProjectGroup = state => state.projectGroup.sortProjectGroup;

export const groupsSelector = createSelector(
  [listProjectGroup, sortProjectGroup],
  (listProjectGroup, sortProjectGroup) => {
    const { error: sortProjectGroupError, loading: sortProjectGroupLoading } = sortProjectGroup;
    const { data: { projectGroups }, error: listProjectGroupError, loading: listProjectGroupLoading, firstTime } = listProjectGroup;
    const newProjectGroups = projectGroups.map(
      projectGroup => ({
        ...projectGroup
      })
    );
    return {
      groups: newProjectGroups,
      loading: (firstTime ? false : listProjectGroupLoading) || sortProjectGroupLoading,
      error: listProjectGroupError || sortProjectGroupError,
      firstTime,
    }
  }
);