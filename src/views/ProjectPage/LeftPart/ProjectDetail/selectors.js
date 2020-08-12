import { filter, flatten, get } from 'lodash';
import { createSelector } from 'reselect';

const detailProject = state => state.project.detailProject;
const listTask = state => state.task.listTask;
const permissionsViewProject = state => state.viewPermissions.data.detailProject;

export const projectSelector = createSelector(
  [detailProject, listTask, permissionsViewProject],
  (detailProject, listTask, permissionsViewProject) => {
    const { data: { project }, error: detailProjectError, loading: detailProjectLoading, firstTime } = detailProject;
    const { data: { tasks } } = listTask;
    const allTasks = flatten(tasks.map(groupTasks => get(groupTasks, 'tasks', [])));
    const permissions = get(permissionsViewProject, `${get(project, "id")}`);
    const newProject = {
      ...project,
      state_name: get(project, 'visibility') ? get(project, 'state_name') : 'Ẩn',
      task_waiting: filter(allTasks, { status_code: 0 }).length,
      task_doing: filter(allTasks, { status_code: 1 }).length,
      task_expired: filter(allTasks, { status_code: 3 }).length,
      task_complete: filter(allTasks, { status_code: 2 }).length,
      task_stop: filter(allTasks, { status_code: 4 }).length,
      permissions: permissions
    }
    return {
      project: newProject,
      loading: (firstTime ? false : detailProjectLoading),
      error: detailProjectError,
      firstTime,
    }
  }
);