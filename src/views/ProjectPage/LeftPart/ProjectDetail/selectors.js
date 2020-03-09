import { createSelector } from 'reselect';
import { get, flatten, filter } from 'lodash';

const detailProject = state => state.project.detailProject;
const listTask = state => state.task.listTask;

export const projectSelector = createSelector(
  [detailProject, listTask],
  (detailProject, listTask) => {
    const { data: { project }, error: detailProjectError, loading: detailProjectLoading } = detailProject;
    const { data: { tasks } } = listTask;
    const allTasks = flatten(tasks.map(groupTasks => get(groupTasks, 'tasks', [])));
    const newProject = {
      ...project,
      state_name: get(project, 'visibility') ? get(project, 'state_name') : 'Hidden',
      task_waiting: filter(allTasks, { status_name: 'Waiting' }).length,
      task_doing: filter(allTasks, { status_name: 'Doing' }).length,
      task_expired: filter(allTasks, { status_name: 'Expired' }).length,
      task_complete: filter(allTasks, { status_name: 'Complete' }).length,
      task_stop: filter(allTasks, { status_name: 'Stop' }).length,
    }
    return {
      project: newProject,
      loading: detailProjectLoading,
      error: detailProjectError,
    }
  }
);