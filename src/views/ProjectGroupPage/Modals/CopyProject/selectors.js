import { createSelector } from 'reselect';
import { get, filter } from 'lodash';

const listProject = state => state.project.listProject;
const listProjectGroup = state => state.projectGroup.listProjectGroup;

export const groupsSelector = createSelector(
  [listProjectGroup, listProject],
  (listProjectGroup, listProject) => {
    const { data: { projectGroups }, loading: listProjectGroupLoading, error: listProjectGroupError } = listProjectGroup;
    const { data: { projects }, loading: listProjectLoading, error: listProjectError } = listProject;
    const groups = projectGroups.map(projectGroup => ({
      ...projectGroup,
      projects: filter(projects, { project_group_id: get(projectGroup, 'id') }),
    }));
    return {
      groups,
      loading: listProjectGroupLoading || listProjectLoading,
      error: listProjectGroupError || listProjectError,
    }
  }
);