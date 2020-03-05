import { createSelector } from 'reselect';
import { get } from 'lodash';

const detailRoom = state => state.room.detailRoom;
const getUserOfRoom = state => state.room.getUserOfRoom;
const listIcon = state => state.icon.listIcon;

export const roomSelector = createSelector(
  [detailRoom, getUserOfRoom, listIcon],
  (detailRoom, getUserOfRoom, listIcon) => {
    const { data: { room }, loading: detailRoomLoading, error: detailRoomError } = detailRoom;
    const { data: { users }, loading: getUserOfRoomLoading, error: getUserOfRoomError } = getUserOfRoom;
    const { data: { icons, defaults }, loading: iconLoading, error: iconError } = listIcon;
    const allIcons = [...icons.map(icon => get(icon, 'url_full')), ...defaults.map(icon => get(icon, 'url_icon'))];
    const newRooms = {
      ...room,
      number_member: users.length,
      icon: allIcons.includes(get(room, 'icon', '___no-icon___')) 
        ? get(room, 'icon') 
        : get(defaults[0], 'url_icon'),
    }
    return ({
      detail: newRooms,
      loading: detailRoomLoading || getUserOfRoomLoading || iconLoading,
      error: detailRoomError || getUserOfRoomError || iconError,
    });
  }
);