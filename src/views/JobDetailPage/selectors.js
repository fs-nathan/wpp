import { createSelector } from 'reselect';
import { findTask } from 'helpers/jobDetail/arrayHelper';

const taskDetail = state => state.taskDetail.detailTask.taskDetails;
const commonTask = state => state.taskDetail.commonTaskDetail;
const colors = state => state.setting.colors;
const taskMember = state => state.taskDetail.taskMember;
const listDetailTask = state => state.taskDetail.listDetailTask;

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

export const membersSelector = createSelector(
  taskMember,
  (member = {}) => {
    return member.member
  }
)

export const makeSelectIsCanView = (type, task_id) => createSelector(
  listDetailTask,
  (listDetailTasks = {}) => {
    let repTask;
    if (type === 'not-room') {
      repTask = listDetailTasks.listDataNotRoom.find((task) => task_id === task.id);
    } else {
      repTask = findTask(listDetailTasks.listTaskDetail, task_id)
    }
    // console.log(repTask, 'makeSelectIsCanView ')
    return repTask ? repTask.new_chat > 0 : false;
  }
)