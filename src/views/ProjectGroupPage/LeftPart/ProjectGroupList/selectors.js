import { createSelector } from 'reselect';
import { get, filter } from 'lodash';

const listProjectGroup = state => state.projectGroup.listProjectGroup;
const listProject = state => state.project.listProject;

export const groupsSelector = createSelector(
  [listProjectGroup, listProject],
  (listProjectGroup, listProject) => {
    const { data: { projectGroups }, error: listProjectGroupError, loading: listProjectGroupLoading } = listProjectGroup;
    const { data: { projects }, loading: listProjectLoading, error: listProjectError } = listProject;
    const newProjectGroups = projectGroups.map(
      projectGroup => ({
        ...projectGroup,
        number_project: filter(
          projects,
          { project_group_id: get(projectGroup, 'id') }
        ).length,
      })
    )
    return {
      groups: newProjectGroups,
      loading: listProjectLoading || listProjectGroupLoading,
      error: listProjectGroupError || listProjectError,
    }
  }
);