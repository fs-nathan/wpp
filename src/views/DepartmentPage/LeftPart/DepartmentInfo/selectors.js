import { get, isArray } from 'lodash';
import { createSelector } from 'reselect';

const detailRoom = state => state.room.detailRoom;
const getUserOfRoom = state => state.room.getUserOfRoom;
const listIcon = state => state.icon.listIcon;

export const roomSelector = createSelector(
  [detailRoom, getUserOfRoom, listIcon],
  (detailRoom, getUserOfRoom, listIcon) => {
    const { data: { room }, loading: detailRoomLoading, error: detailRoomError, firstTime: detailFirst } = detailRoom;
    const { data: { users } } = getUserOfRoom;
    const { data: { icons, defaults } } = listIcon;
    const allIcons = [...icons.map(icon => get(icon, 'url_full')), ...defaults.map(icon => get(icon, 'url_icon'))];
    const newRooms = {
      ...room,
      number_member: isArray(users) ? users.length : 0,
      icon: allIcons.includes(get(room, 'icon', '___no-icon___'))
        ? get(room, 'icon')
        : get(defaults[0], 'url_icon'),
    }
    return ({
      detail: newRooms,
      loading: (detailFirst ? false : detailRoomLoading),
      error: detailRoomError,
      firstTime: detailFirst,
    });
  }
);