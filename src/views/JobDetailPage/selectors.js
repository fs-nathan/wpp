import { findTask } from 'helpers/jobDetail/arrayHelper';
import { get } from 'lodash';
import { createSelector } from 'reselect';
import { OFFER_GET_MEMBER_TO_ADD } from 'views/OfferPage/redux/types';

const taskDetail = state => state.taskDetail.detailTask.taskDetails;
const commonTask = state => state.taskDetail.commonTaskDetail;
const colors = state => state.setting.colors;
const taskMember = state => state.taskDetail.taskMember;
const listDetailTask = state => state.taskDetail.listDetailTask;

export const selectedTaskSelector = createSelector(
  taskDetail,
  (task = {}) => {
    return task ? task.is_ghim : false
  }
);

export const taskIdSelector = createSelector(
  commonTask,
  (task = {}) => {
    return task.activeTaskId
  }
)

export const currentColorSelector = createSelector(
  colors,
  (colors = []) => {
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

const listUserOfGroupRoom = state => state.offerPage[OFFER_GET_MEMBER_TO_ADD].members;
export const allMembersSelector = createSelector(
  [listUserOfGroupRoom],
  (listUserOfGroupRoom) => {
    let listMember = [];
    listUserOfGroupRoom.map((room) => {
      let users = get(room, 'users');
      users.map((user) => {
        user.room = get(room, 'name');
        listMember.push(user);
      })
    })
    return {
      members: listMember
    }
  }
);

export const getNumberChatNotView = (task_id) => createSelector(
  listDetailTask,
  (listDetailTasks = {}) => {
    return listDetailTasks.listDataNotRoom.filter((task) => task_id !== task.id && task.new_chat > 0).length;
  }
)
