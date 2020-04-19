import { concat, filter, find, get } from 'lodash';
import { createSelector } from 'reselect';

const listProject = state => state.project.listProject;
const createProject = state => state.project.createProject;
const sortProject = state => state.project.sortProject;
const listProjectGroup = state => state.projectGroup.listProjectGroup;
const deleteProjectGroup = state => state.projectGroup.deleteProjectGroup;
const colors = state => state.setting.colors;
const listIcon = state => state.icon.listIcon;
const showProject = state => state.project.showProject;
const hideProject = state => state.project.hideProject;

export const projectsSelector = createSelector(
  [listProjectGroup, listProject, listIcon, sortProject, deleteProjectGroup, createProject],
  (listProjectGroup, listProject, listIcon, sortProject, deleteProjectGroup, createProject) => {
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

    const {
      loading: deleteLoading,
      error: deleteError,
    } = deleteProjectGroup;

    const {
      loading: createLoading,
      error: createError,
    } = createProject;

    const { data: { icons, defaults } } = listIcon;
    const allIcons = [...icons.map(icon => get(icon, 'url_full')), ...defaults.map(icon => get(icon, 'url_icon'))];

    const loading = listProjectLoading || sortProjectLoading || deleteLoading || createLoading;
    const error = listProjectError || sortProjectError || deleteError || createError;

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
      state_code: get(project, 'visibility') ? get(project, 'state_code') : 5,
    }));

    const newSummary = {
      all: newProjects.length,
      active: filter(newProjects, { visibility: true }).length,
      hidden: filter(newProjects, { visibility: false }).length,
      waiting: filter(newProjects, { state_code: 0 }).length,
      doing: filter(newProjects, { state_code: 1 }).length,
      complete: filter(newProjects, { state_code: 2 }).length,
      expired: filter(newProjects, { state_code: 3 }).length,
      created: filter(newProjects, { me_created: true }).length,
      assigned: filter(newProjects, { me_created: false }).length,
    }
    return {
      projects: newProjects,
      summary: newSummary,
      projectGroupsCount: projectGroups.length,
      loading,
      error,
    }
  }
);

export const showHidePendingsSelector = createSelector(
  [showProject, hideProject],
  (showProject, hideProject) => {
    const { pendings: showPendings, erorr: showError } = showProject;
    const { pendings: hidePendings, erorr: hideError } = hideProject;
    return {
      pendings: concat(showPendings, hidePendings),
      error: showError || hideError,
    }
  }
)

export const bgColorSelector = createSelector(
  [colors],
  (colors) => {
    const bgColor = colors.find(item => item.selected === true);
    return bgColor
  }
);