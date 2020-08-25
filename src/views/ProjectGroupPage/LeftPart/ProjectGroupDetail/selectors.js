import { filter, get } from 'lodash';
import { createSelector } from 'reselect';

const detailProjectGroup = state => state.projectGroup.detailProjectGroup;
const memberProjectGroup = state => state.projectGroup.memberProjectGroup;
const listProject = state => state.project.listProject;

export const groupSelector = createSelector(
  [detailProjectGroup, memberProjectGroup, listProject],
  (detailProjectGroup, memberProjectGroup, listProject) => {
    const { data: { projectGroup }, error: detailProjectGroupError, loading: detailProjectGroupLoading, firstTime: detailFirst } = detailProjectGroup;
    const { data: { members }, error: memberProjectGroupError, loading: memberProjectGroupLoading, firstTime: memberFirst } = memberProjectGroup;
    const { data: { projects } } = listProject;
    const newGroup = {
      ...projectGroup,
      members,
      statistics: {
        total_task: filter(projects, { project_group_id: get(projectGroup, 'id') }).length,
        task_waiting: filter(projects, { project_group_id: get(projectGroup, 'id'), visibility: true, state_code: 0 }).length,
        task_doing: filter(projects, { project_group_id: get(projectGroup, 'id'), visibility: true, state_code: 1 }).length,
        task_expired: filter(projects, { project_group_id: get(projectGroup, 'id'), visibility: true, state_code: 3 }).length,
        task_complete: filter(projects, { project_group_id: get(projectGroup, 'id'), visibility: true, state_code: 2 }).length,
        task_stop: filter(projects, { project_group_id: get(projectGroup, 'id'), visibility: true, state_code: 4 }).length,
        task_hidden: filter(projects, { project_group_id: get(projectGroup, 'id'), visibility: false }).length,
      }
    }
    return {
      group: newGroup,
      loading: (detailFirst ? false : detailProjectGroupLoading) ||
        (memberFirst ? false : memberProjectGroupLoading),
      error: detailProjectGroupError || memberProjectGroupError,
      firstTime: detailFirst && memberFirst,
    }
  }
);