import { createSelector } from 'reselect';
import { get, filter, remove } from 'lodash';

const listProjectGroup = state => state.projectGroup.listProjectGroup;
const sortProjectGroup = state => state.projectGroup.sortProjectGroup;
const listProject = state => state.project.listProject;
const listIcon = state => state.icon.listIcon;

export const groupsSelector = createSelector(
  [listProjectGroup, listProject, listIcon, sortProjectGroup],
  (listProjectGroup, listProject, listIcon, sortProjectGroup) => {
    const { error: sortProjectGroupError, loading: sortProjectGroupLoading } = sortProjectGroup;
    const { data: { projectGroups }, error: listProjectGroupError, loading: listProjectGroupLoading } = listProjectGroup;
    const { data: { projects } } = listProject;
    const { data: { icons, defaults } } = listIcon;
    const allIcons = [...icons.map(icon => get(icon, 'url_full')), ...defaults.map(icon => get(icon, 'url_icon'))];
    let newProjectGroups = projectGroups;
    remove(newProjectGroups, { id: 'default'} );
    newProjectGroups = newProjectGroups.map(
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
      loading: listProjectGroupLoading || sortProjectGroupLoading,
      error: listProjectGroupError || sortProjectGroupError,
    }
  }
);