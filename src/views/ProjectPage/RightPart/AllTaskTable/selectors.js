import { createSelector } from 'reselect';
import { find, get } from 'lodash';

const listTask = state => state.task.listTask;
const detailProject = state => state.project.detailProject;
const colors = state => state.setting.colors;
const listGroupTask = state => state.groupTask.listGroupTask;

export const tasksSelector = createSelector(
  [listTask, listGroupTask],
  (listTask, listGroupTask) => {
    const { data: { tasks }, loading: listTaskLoading, error: listTaskError } = listTask;
    const { data: { groupTasks }, loading: listGroupTaskLoading, error: listGroupTaskError } = listGroupTask;
    const newTasks = tasks.map(groupTask => ({
      ...groupTask,
      ...find(groupTasks, { id: get(groupTask, 'id') }),
    }));
    return {
      tasks: newTasks,
      loading: listTaskLoading || listGroupTaskLoading,
      error: listTaskError || listGroupTaskError,
    }
  }
);

export const projectSelector = createSelector(
  [detailProject],
  (detailProject) => {
    const { data: { project }, loading, error } = detailProject;
    return {
      project,
      loading,
      error,
    }
  }
);

export const bgColorSelector = createSelector(
  [colors],
  (colors) => {
    return colors.find(item => item.selected === true); 
  }
);