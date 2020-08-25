import { filter } from 'lodash';
import { createSelector } from 'reselect';

const detailDefaultGroup = state => state.projectGroup.detailDefaultGroup;
const listProject = state => state.project.listProject;

export const groupSelector = createSelector(
  [detailDefaultGroup, listProject],
  (detailDefaultGroup, listProject) => {
    const { data: { projectGroup }, error: detailDefaultGroupError, loading: detailDefaultGroupLoading, firstTime } = detailDefaultGroup;
    const { data: { projects } } = listProject;
    const newGroup = {
      ...projectGroup,
      statistics: {
        total_task: filter(projects, { project_group_id: null }).length,
        task_waiting: filter(projects, { project_group_id: null, visibility: true, state_code: 0 }).length,
        task_doing: filter(projects, { project_group_id: null, visibility: true, state_code: 1 }).length,
        task_expired: filter(projects, { project_group_id: null, visibility: true, state_code: 3 }).length,
        task_complete: filter(projects, { project_group_id: null, visibility: true, state_code: 2 }).length,
        task_stop: filter(projects, { project_group_id: null, visibility: true, state_code: 4 }).length,
        task_hidden: filter(projects, { project_group_id: null, visibility: false }).length,
      }
    }
    return {
      group: newGroup,
      loading: firstTime ? false : detailDefaultGroupLoading,
      error: detailDefaultGroupError,
      firstTime,
    }
  }
);