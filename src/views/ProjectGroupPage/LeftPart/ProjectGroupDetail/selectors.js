import { createSelector } from 'reselect';
import { filter, get } from 'lodash';

const detailProjectGroup = state => state.projectGroup.detailProjectGroup;
const memberProjectGroup = state => state.projectGroup.memberProjectGroup;
const listProject = state => state.project.listProject;

export const groupSelector = createSelector(
  [detailProjectGroup, memberProjectGroup, listProject],
  (detailProjectGroup, memberProjectGroup, listProject) => {
    const { data: { projectGroup }, error: detailProjectGroupError, loading: detailProjectGroupLoading } = detailProjectGroup;
    const { data: { members }, error: memberProjectGroupError, loading: memberProjectGroupLoading } = memberProjectGroup;
    const { data: { projects }, loading: listProjectLoading, error: listProjectError } = listProject;
    const newGroup = {
      ...projectGroup,
      members,
      statistics: {
        total_task: filter(projects, { project_group_id: get(projectGroup, 'id') }).length,
        task_waiting: filter(projects, { project_group_id: get(projectGroup, 'id'), state_name: 'Waiting' }).length,
        task_doing: filter(projects, { project_group_id: get(projectGroup, 'id'), state_name: 'Doing' }).length,
        task_expired: filter(projects, { project_group_id: get(projectGroup, 'id'), state_name: 'Expired' }).length,
        task_complete: filter(projects, { project_group_id: get(projectGroup, 'id'), state_name: 'Complete' }).length,
        task_stop: filter(projects, { project_group_id: get(projectGroup, 'id'), state_name: 'Stop' }).length,
        task_hidden: filter(projects, { project_group_id: get(projectGroup, 'id'), state_name: 'Hidden' }).length,
      }
    }
    return {
      group: newGroup,
      loading: detailProjectGroupLoading || memberProjectGroupLoading || listProjectLoading,
      error: detailProjectGroupError || memberProjectGroupError || listProjectError,
    }
  }
);