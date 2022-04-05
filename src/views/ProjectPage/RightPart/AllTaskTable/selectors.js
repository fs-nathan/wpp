import { concat, find, get } from 'lodash';
import { createSelector } from 'reselect';

const listTask = state => state.task.listTask;
const deleteTask = state => state.task.deleteTask;
const sortTask = state => state.task.sortTask;
const detailProject = state => state.project.detailProject;
const colors = state => state.setting.colors;
const listGroupTask = state => state.groupTask.listGroupTask;
const showProject = state => state.project.showProject;
const hideProject = state => state.project.hideProject;

export const tasksSelector = createSelector(
  [listTask, listGroupTask, sortTask, deleteTask],
  (listTask, listGroupTask, sortTask, deleteTask) => {
    const { data: { tasks, summary_row }, loading: listTaskLoading, error: listTaskError, firstTime } = listTask;
    const { loading: sortTaskLoading, error: sortTaskError } = sortTask;
    const { loading: deleteTaskLoading, error: deleteTaskError } = deleteTask;
    const { data: { groupTasks } } = listGroupTask;
    const newTasks = tasks.map(groupTask => ({
      ...groupTask,
      ...find(groupTasks, { id: get(groupTask, 'id') }),
    }));
    return {
      tasks: newTasks,
      summary_row,
      loading: (firstTime ? false : listTaskLoading) || sortTaskLoading || deleteTaskLoading,
      error: listTaskError || sortTaskError || deleteTaskError,
      firstTime,
    }
  }
);

export const memberTaskSelector = createSelector([listTask], (listTask) => {
    const { data: {member}} = listTask;
    return {
        member
    }
});


export const projectSelector = createSelector(
  [detailProject],
  (detailProject) => {
    const { data: { project }, loading, error, firstTime } = detailProject;
    return {
      project,
      loading: firstTime ? false : loading,
      error,
      firstTime,
    }
  }
);

export const showHidePendingsSelector = createSelector(
  [showProject, hideProject],
  (showProject, hideProject) => {
    const { pendings: showPendings, erorr: showError } = showProject;
    const { pendings: hidePendings, erorr: hideError } = hideProject;
    return {
      pendings: concat(showPendings, hidePendings),
      error: showError || hideError,
    }
  }
)

export const bgColorSelector = createSelector(
  [colors],
  (colors) => {
    return colors.find(item => item.selected === true);
  }
);