import { filter, get } from 'lodash';
import { createSelector } from 'reselect';

const listProject = state => state.project.listProject;
const listProjectGroup = state => state.projectGroup.listProjectGroup;
const copyProject = state => state.project.copyProject;

export const groupsSelector = createSelector(
  [listProjectGroup, listProject],
  (listProjectGroup, listProject) => {
    const { data: { projectGroups }, loading: listProjectGroupLoading, error: listProjectGroupError, firstTime: groupFirst } = listProjectGroup;
    const { data: { projects }, loading: listProjectLoading, error: listProjectError, firstTime: projectFirst } = listProject;
    const groups = projectGroups.map(projectGroup => ({
      ...projectGroup,
      projects: filter(projects, { project_group_id: get(projectGroup, 'id') }),
    }));
    return {
      groups: groups,
      loading: (groupFirst ? false : listProjectGroupLoading) ||
        (projectFirst ? false : listProjectLoading),
      error: listProjectGroupError || listProjectError,
      firstTime: groupFirst && projectFirst
    }
  }
);

export const activeLoadingSelector = createSelector(
  [copyProject],
  (copyProject) => {
    const { loading } = copyProject;
    return loading;
  }
);