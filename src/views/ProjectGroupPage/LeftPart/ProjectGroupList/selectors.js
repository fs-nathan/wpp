import { filter, get, remove } from 'lodash';
import { createSelector } from 'reselect';

const listProjectGroup = state => state.projectGroup.listProjectGroup;
const createProjectGroup = state => state.projectGroup.createProjectGroup;
const sortProjectGroup = state => state.projectGroup.sortProjectGroup;
const listProject = state => state.project.listProject;
const listIcon = state => state.icon.listIcon;

export const groupsSelector = createSelector(
  [listProjectGroup, listProject, listIcon, sortProjectGroup, createProjectGroup],
  (listProjectGroup, listProject, listIcon, sortProjectGroup, createProjectGroup) => {
    const { error: sortProjectGroupError, loading: sortProjectGroupLoading } = sortProjectGroup;
    const { data: { projectGroups }, error: listProjectGroupError, loading: listProjectGroupLoading, firstTime } = listProjectGroup;
    const { data: { projects } } = listProject;
    const { data: { icons, defaults } } = listIcon;
    const { loading: createLoading, error: createError } = createProjectGroup;
    const allIcons = [...icons.map(icon => get(icon, 'url_full')), ...defaults.map(icon => get(icon, 'url_icon'))];
    let newProjectGroups = projectGroups;
    remove(newProjectGroups, { id: 'default' });
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
      loading: (firstTime ? false : listProjectGroupLoading) || sortProjectGroupLoading || createLoading,
      error: listProjectGroupError || sortProjectGroupError || createError,
      firstTime,
    }
  }
);