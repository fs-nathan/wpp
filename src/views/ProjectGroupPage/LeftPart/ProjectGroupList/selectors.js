import { createSelector } from 'reselect';
import { get, filter } from 'lodash';

const listProjectGroup = state => state.projectGroup.listProjectGroup;
const listProject = state => state.project.listProject;
const listIcon = state => state.icon.listIcon;

export const groupsSelector = createSelector(
  [listProjectGroup, listProject, listIcon],
  (listProjectGroup, listProject, listIcon) => {
    const { data: { projectGroups }, error: listProjectGroupError, loading: listProjectGroupLoading } = listProjectGroup;
    const { data: { projects }, loading: listProjectLoading, error: listProjectError } = listProject;
    const { data: { icons, defaults }, loading: iconLoading, error: iconError } = listIcon;
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
    const defaultNumberProject = filter(
      projects, 
      project => get(project, 'project_group_id') === null
    ).length;
    return {
      groups: newProjectGroups,
      defaultNumberProject,
      loading: listProjectLoading || listProjectGroupLoading || iconLoading,
      error: listProjectGroupError || listProjectError || iconError,
    }
  }
);