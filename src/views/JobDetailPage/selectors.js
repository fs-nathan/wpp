import { createSelector } from 'reselect';

const taskDetail = state => state.taskDetail.detailTask.taskDetails;

export const selectedTaskSelector = createSelector(
  taskDetail,
  (task = {}) => {
    // console.log('task detail', task)
    return task? task.is_ghim: false
  }
);