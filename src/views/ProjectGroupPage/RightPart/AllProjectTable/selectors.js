import { concat, filter, find, get } from 'lodash';
import { createSelector } from 'reselect';

const listProject = state => state.project.listProject;
const sortProject = state => state.project.sortProject;
const listProjectGroup = state => state.projectGroup.listProjectGroup;
const colors = state => state.setting.colors;
const listIcon = state => state.icon.listIcon;
const showProject = state => state.project.showProject;
const hideProject = state => state.project.hideProject;
const detailProjectGroup = state => state.projectGroup.detailProjectGroup;

export const projectsSelector = createSelector(
  [listProjectGroup, listProject, listIcon, sortProject,detailProjectGroup],
  (listProjectGroup, listProject, listIcon, sortProject,detailProjectGroup) => {
    const {
      data: { projects },
      loading: listProjectLoading,
      error: listProjectError,
      firstTime,
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
      project_group: find(projectGroups, (item) => item.id === get(project, 'project_group_id')),
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
      group_work_types: get(detailProjectGroup.data, 'projectGroup.work_types',[]),
      summary: newSummary,
      projectGroupsCount: projectGroups.length,
      loading: loading,
      error,
      firstTime,
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