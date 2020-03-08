import { createSelector } from 'reselect';
import { get, find } from 'lodash';

const listProject = state => state.project.listProject;
const sortProject = state => state.project.sortProject;
const listProjectGroup = state => state.projectGroup.listProjectGroup;
const colors = state => state.setting.colors;
const listIcon = state => state.icon.listIcon;

export const projectsSelector = createSelector(
  [listProjectGroup, listProject, listIcon, sortProject],
  (listProjectGroup, listProject, listIcon, sortProject) => {
    const {
      data: { projects },
      loading: listProjectLoading,
      error: listProjectError
    } = listProject;

    const {
      loading: sortProjectLoading,
      error: sortProjectError
    } = sortProject;
  
    const {
      data: { projectGroups },
    } = listProjectGroup;

    const { data: { icons, defaults } } = listIcon;
    const allIcons = [...icons.map(icon => get(icon, 'url_full')), ...defaults.map(icon => get(icon, 'url_icon'))];
  
    const loading = listProjectLoading || sortProjectLoading;
    const error = listProjectError || sortProjectError;

    const newProjects = projects.map(project => ({
      ...project,
      project_group_id: find(projectGroups, { id: get(project, 'project_group_id') })
        ? get(project, 'project_group_id')
        : null,
      icon: allIcons.includes(
        get(find(projectGroups, { id: get(project, 'project_group_id') }), 'icon', '___no-icon___')
      ) 
        ? get(find(projectGroups, { id: get(project, 'project_group_id') }), 'icon') 
        : get(defaults[0], 'url_icon'),
    }));
    return {
      projects: newProjects,
      loading,
      error,
    }
  }
);

export const bgColorSelector = createSelector(
  [colors],
  (colors) => {
    const bgColor = colors.find(item => item.selected === true);
    return bgColor
  }
);