import { createSelector } from 'reselect';
import { filter } from 'lodash';

const detailDefaultGroup = state => state.projectGroup.detailDefaultGroup;
const listProject = state => state.project.listProject;

export const groupSelector = createSelector(
  [detailDefaultGroup, listProject],
  (detailDefaultGroup, listProject) => {
    const { data: { projectGroup }, error: detailDefaultGroupError, loading: detailDefaultGroupLoading } = detailDefaultGroup;
    const { data: { projects }, loading: listProjectLoading, error: listProjectError } = listProject;
    const newGroup = {
      ...projectGroup,
      statistics: {
        total_task: filter(projects, { project_group_id: null }).length,
        task_waiting: filter(projects, { project_group_id: null, state_name: 'Waiting' }).length,
        task_doing: filter(projects, { project_group_id: null, state_name: 'Doing' }).length,
        task_expired: filter(projects, { project_group_id: null, state_name: 'Expired' }).length,
        task_complete: filter(projects, { project_group_id: null, state_name: 'Complete' }).length,
        task_stop: filter(projects, { project_group_id: null, state_name: 'Stop' }).length,
        task_hidden: filter(projects, { project_group_id: null, state_name: 'Hidden' }).length,
      }
    }
    return {
      group: newGroup,
      loading: detailDefaultGroupLoading || listProjectLoading,
      error: detailDefaultGroupError || listProjectError,
    }
  }
);