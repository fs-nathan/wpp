import { get } from 'lodash';
import { createSelector } from 'reselect';

const listProjectGroupDeleted = state => state.projectGroup.listProjectGroupDeleted;
export const groupsSelector = createSelector(
  [listProjectGroupDeleted],
  (listProjectGroupDeleted, listIcon) => {
    const { data: { projectGroups }, error: listProjectGroupError, loading: listProjectGroupLoading } = listProjectGroupDeleted;
    const newProjectGroups = projectGroups.map(
      projectGroup => ({
        ...projectGroup,
        icon: get(projectGroup, 'icon')
      })
    );
    return {
      groups: newProjectGroups,
      loading: listProjectGroupLoading,
      error: listProjectGroupError,
    }
  }
);