import { createSelector } from 'reselect';

const taskDetail = state => state.taskDetail.detailTask.taskDetails;
const commonTask = state => state.taskDetail.commonTaskDetail;
const colors = state => state.setting.colors;

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

export const currentColorSelector = createSelector(
  colors,
  (colors = []) => {
    // console.log('task detail', task)
    const selectedColor = colors.find(({ selected }) => selected)
    return selectedColor ? selectedColor.color : '#fff'
  }
)