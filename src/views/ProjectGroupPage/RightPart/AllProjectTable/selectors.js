import { createSelector } from 'reselect';
import { get, find } from 'lodash';

const listProject = state => state.project.listProject;
const listProjectGroup = state => state.projectGroup.listProjectGroup;
const detailProjectGroup = state => state.projectGroup.detailProjectGroup;
const colors = state => state.setting.colors;
const listIcon = state => state.icon.listIcon;

export const projectsSelector = createSelector(
  [listProjectGroup, listProject, detailProjectGroup, listIcon],
  (listProjectGroup, listProject, detailProjectGroup, listIcon) => {
    const {
      data: { projects },
      loading: listProjectLoading,
      error: listProjectError
    } = listProject;
  
    const {
      data: { projectGroups },
      loading: listProjectGroupLoading,
      error: listProjectGroupError,
    } = listProjectGroup;
  
    const {
      loading: detailProjectGroupLoading,
      error: detailProjectGroupError
    } = detailProjectGroup;

    const { data: { icons, defaults }, loading: iconLoading, error: iconError } = listIcon;
    const allIcons = [...icons.map(icon => get(icon, 'url_full')), ...defaults.map(icon => get(icon, 'url_icon'))];
  
    const loading = listProjectLoading || detailProjectGroupLoading || listProjectGroupLoading || iconLoading;
    const error = listProjectError || detailProjectGroupError || listProjectGroupError || iconError;

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
      state_name: get(project, 'visibility') ? get(project, 'state_name') : 'Hidden',
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