import { concat, filter, get } from 'lodash';
import { createSelector } from 'reselect';

const listProject = state => state.project.listProject;
const listProjectGroup = state => state.projectGroup.listProjectGroup;
const detailDefaultGroup = state => state.projectGroup.detailDefaultGroup;

export const groupsSelector = createSelector(
  [listProjectGroup, listProject, detailDefaultGroup],
  (listProjectGroup, listProject, detailDefaultGroup) => {
    const { data: { projectGroups }, loading: listProjectGroupLoading, error: listProjectGroupError, firstTime: groupFirst } = listProjectGroup;
    const { data: { projects }, loading: listProjectLoading, error: listProjectError, firstTime: projectFirst } = listProject;
    const { data: { projectGroup: _defaultProjectGroup }, error: detailDefaultGroupError, loading: detailDefaultGroupLoading, firstTime: defaultFirst } = detailDefaultGroup;
    const groups = projectGroups.map(projectGroup => ({
      ...projectGroup,
      projects: filter(projects, { project_group_id: get(projectGroup, 'id') }),
    }));
    const defaultProjectGroup = {
      ..._defaultProjectGroup,
      projects: filter(projects, { project_group_id: null }),
    };
    return {
      groups: concat(groups, defaultProjectGroup),
      loading: (groupFirst ? false : listProjectGroupLoading) ||
        (projectFirst ? false : listProjectLoading) ||
        (defaultFirst ? false : detailDefaultGroupLoading),
      error: listProjectGroupError || listProjectError || detailDefaultGroupError,
      firstTime: groupFirst && projectFirst, defaultFirst,
    }
  }
);