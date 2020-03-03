import { createSelector } from 'reselect';

const taskDetail = state => state.taskDetail.detailTask.taskDetails;
const commonTask = state => state.taskDetail.commonTaskDetail;

export const selectedTaskSelector = createSelector(
  taskDetail,
  (task = {}) => {
    // console.log('task detail', task)
    return task ? task.is_ghim : false
  }
);

export const taskIdSelector = createSelector(
  commonTask,
  (task = {}) => {
    // console.log('task detail', task)
    return task.activeTaskId
  }
)