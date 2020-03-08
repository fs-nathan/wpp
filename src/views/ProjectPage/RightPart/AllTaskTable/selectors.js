import { createSelector } from 'reselect';
import { find, get } from 'lodash';

const listTask = state => state.task.listTask;
const sortTask = state => state.task.sortTask;
const detailProject = state => state.project.detailProject;
const colors = state => state.setting.colors;
const listGroupTask = state => state.groupTask.listGroupTask;

export const tasksSelector = createSelector(
  [listTask, listGroupTask, sortTask],
  (listTask, listGroupTask, sortTask) => {
    const { data: { tasks }, loading: listTaskLoading, error: listTaskError } = listTask;
    const { loading: sortTaskLoading, error: sortTaskError } = sortTask;
    const { data: { groupTasks } } = listGroupTask;
    const newTasks = tasks.map(groupTask => ({
      ...groupTask,
      ...find(groupTasks, { id: get(groupTask, 'id') }),
    }));
    return {
      tasks: newTasks,
      loading: listTaskLoading || sortTaskLoading,
      error: listTaskError || sortTaskError,
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