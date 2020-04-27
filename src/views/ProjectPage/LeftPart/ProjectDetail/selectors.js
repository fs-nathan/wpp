import { filter, flatten, get } from 'lodash';
import { createSelector } from 'reselect';

const detailProject = state => state.project.detailProject;
const updateProject = state => state.project.updateProject;
const deleteProject = state => state.project.deleteProject;
const listTask = state => state.task.listTask;

export const projectSelector = createSelector(
  [detailProject, listTask, updateProject, deleteProject],
  (detailProject, listTask, updateProject, deleteProject) => {
    const { data: { project }, error: detailProjectError, loading: detailProjectLoading, firstTime } = detailProject;
    const { data: { tasks } } = listTask;
    const allTasks = flatten(tasks.map(groupTasks => get(groupTasks, 'tasks', [])));
    const { loading: updateLoading, error: updateError } = updateProject;
    const { loading: deleteLoading, error: deleteError } = deleteProject;
    const newProject = {
      ...project,
      state_name: get(project, 'visibility') ? get(project, 'state_name') : 'Ẩn',
      task_waiting: filter(allTasks, { status_code: 0 }).length,
      task_doing: filter(allTasks, { status_code: 1 }).length,
      task_expired: filter(allTasks, { status_code: 3 }).length,
      task_complete: filter(allTasks, { status_code: 2 }).length,
      task_stop: filter(allTasks, { status_code: 4 }).length,
    }
    return {
      project: newProject,
      loading: (firstTime ? false : detailProjectLoading) || updateLoading || deleteLoading,
      error: detailProjectError || updateError || deleteError,
      firstTime,
    }
  }
);