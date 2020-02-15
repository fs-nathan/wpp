import { createSelector } from 'reselect';
import { get, find } from 'lodash';

const listProject = state => state.project.listProject;
const listProjectGroup = state => state.projectGroup.listProjectGroup;
const detailProjectGroup = state => state.projectGroup.detailProjectGroup;
const colors = state => state.setting.colors;

export const projectsSelector = createSelector(
  [listProjectGroup, listProject, detailProjectGroup],
  (listProjectGroup, listProject, detailProjectGroup) => {
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
  
    const loading = listProjectLoading || detailProjectGroupLoading || listProjectGroupLoading;
    const error = listProjectError || detailProjectGroupError || listProjectGroupError;

    const newProjects = projects.map(project => {
      const curIcon = get(find(projectGroups, { id: get(project, 'project_group_id') }), 'icon');
      return {
        ...project,
        icon: curIcon,
      }
    });

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