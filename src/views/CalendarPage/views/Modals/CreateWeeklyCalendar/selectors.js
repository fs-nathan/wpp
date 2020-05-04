import { get } from 'lodash';
import { createSelector } from 'reselect';

const listUserOfGroupRoom = state => state.user.listUserOfGroup.data.rooms;
export const membersSelector = createSelector(
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
)

const listScheduleOfWeek = state => state.calendar.listScheduleOfWeekFromModal;
export const scheduleOfWeekSelector = createSelector(
  [listScheduleOfWeek],
  (listScheduleOfWeek) => {
    return ({
      data: listScheduleOfWeek.data.schedules,
      error: listScheduleOfWeek.error,
      loading: listScheduleOfWeek.loading
    })
  }
);