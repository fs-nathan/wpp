import { createSelector } from 'reselect';
import { get } from 'lodash';

const listProject = state => state.project.listProject;
const listProjectGroup = state => state.projectGroup.listProjectGroup;

export const groupsSelector = createSelector(
  [listProjectGroup, listProject],
  (listProjectGroup, listProject) => {
    const { data: { projectGroups }, loading: listProjectGroupLoading, error: listProjectGroupError } = listProjectGroup;
    const { data: { projects }, loading: listProjectLoading, error: listProjectError } = listProject;
    const groups = projectGroups.map(projectGroup => {
      const curId = get(projectGroup, 'id');
      const curProjects = projects.filter(project => get(project, 'project_group_id') === curId)
      return {
        ...projectGroup,
        projects: curProjects,
      }
    });
    return {
      groups,
      loading: listProjectGroupLoading || listProjectLoading,
      error: listProjectGroupError || listProjectError,
    }
  }
);