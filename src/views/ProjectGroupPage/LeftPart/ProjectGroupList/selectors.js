import { filter, get } from 'lodash';
import { createSelector } from 'reselect';

const listProjectGroup = state => state.projectGroup.listProjectGroup;
const sortProjectGroup = state => state.projectGroup.sortProjectGroup;
const listProject = state => state.project.listProject;
const listIcon = state => state.icon.listIcon;

export const groupsSelector = createSelector(
  [listProjectGroup, listProject, listIcon, sortProjectGroup],
  (listProjectGroup, listProject, listIcon, sortProjectGroup) => {
    const { error: sortProjectGroupError, loading: sortProjectGroupLoading } = sortProjectGroup;
    const { data: { projectGroups }, error: listProjectGroupError, loading: listProjectGroupLoading, firstTime } = listProjectGroup;
    const { data: { projects } } = listProject;
    const { data: { icons, defaults } } = listIcon;
    const allIcons = [...icons.map(icon => get(icon, 'url_full')), ...defaults.map(icon => get(icon, 'url_icon'))];
    const newProjectGroups = projectGroups.map(
      projectGroup => ({
        ...projectGroup,
        number_project: filter(
          projects,
          { project_group_id: get(projectGroup, 'id') }
        ).length,
        icon: allIcons.includes(get(projectGroup, 'icon', '___no-icon___'))
          ? get(projectGroup, 'icon')
          : get(defaults[0], 'url_icon'),
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